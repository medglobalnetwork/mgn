const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', '..', 'mgn-api', 'src', 'modules');
const newModules = ['flags', 'recommendation', 'analytics', 'events', 'consent', 'localization'];

const modTemplate = `use axum::{routing::get, Router, Json};
use serde_json::json;

pub fn routes() -> Router {
    Router::new()
        .route("/status", get(status))
}

async fn status() -> Json<serde_json::Value> {
    Json(json!({ "status": "success", "message": "Module is running" }))
}
`;

for (const modName of newModules) {
    const dir = path.join(modulesDir, modName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'mod.rs'), modTemplate);
}

// Update mod.rs in modules folder
const mainModPath = path.join(modulesDir, 'mod.rs');
let mainModContent = fs.readFileSync(mainModPath, 'utf8');
for (const modName of newModules) {
    if (!mainModContent.includes(`pub mod ${modName};`)) {
        mainModContent += `pub mod ${modName};\n`;
    }
}
fs.writeFileSync(mainModPath, mainModContent);

// Update router.rs
const routerPath = path.join(__dirname, '..', '..', 'mgn-api', 'src', 'router.rs');
let routerContent = fs.readFileSync(routerPath, 'utf8');

// Insert imports
for (const modName of newModules) {
    if (!routerContent.includes(`use crate::modules::${modName};`)) {
        routerContent = routerContent.replace('use crate::modules::admin;', `use crate::modules::admin;\nuse crate::modules::${modName};`);
    }
}

// Insert routes
for (const modName of newModules) {
    if (!routerContent.includes(`.nest("/${modName}", ${modName}::routes())`)) {
        routerContent = routerContent.replace('.nest("/admin", admin::routes())', `.nest("/admin", admin::routes())\n        .nest("/${modName}", ${modName}::routes())`);
    }
}
fs.writeFileSync(routerPath, routerContent);

console.log("Modules scaffolded successfully");
