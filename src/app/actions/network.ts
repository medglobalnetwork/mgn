"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSuggestedConnections(userId: string) {
  // Get all connections where the user is either requester or receiver
  const { data: connections } = await supabase
    .from('connections')
    .select('requester_id, receiver_id')
    .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`);

  // Extract IDs to exclude
  const excludeIds = [userId];
  if (connections) {
    connections.forEach((conn: any) => {
      excludeIds.push(conn.requester_id);
      excludeIds.push(conn.receiver_id);
    });
  }

  // Get users not in exclude list
  // Limit to 20 suggestions
  const { data: suggestions, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, headline, city, primary_category')
    .not('id', 'in', `(${excludeIds.join(',')})`)
    .limit(20);

  if (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }

  return suggestions || [];
}

export async function getConnectionRequests(userId: string) {
  const { data: requests, error } = await supabase
    .from('connections')
    .select(`
      id,
      created_at,
      profiles!connections_requester_id_fkey (
        id,
        full_name,
        avatar_url,
        headline
      )
    `)
    .eq('receiver_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
    return [];
  }

  return requests || [];
}

export async function getConnectedNetwork(userId: string) {
  const { data: connections, error } = await supabase
    .from('connections')
    .select(`
      id,
      requester_id,
      receiver_id,
      created_at,
      requester:profiles!connections_requester_id_fkey(id, full_name, avatar_url, headline),
      receiver:profiles!connections_receiver_id_fkey(id, full_name, avatar_url, headline)
    `)
    .eq('status', 'accepted')
    .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching connected network:", error);
    return [];
  }

  // Map to a cleaner format where we just return the 'other' person
  return (connections || []).map((conn: any) => {
    const isRequester = conn.requester_id === userId;
    const profile = isRequester ? conn.receiver : conn.requester;
    return {
      connection_id: conn.id,
      connected_at: conn.created_at,
      profile
    };
  });
}

export async function sendConnectionRequest(requesterId: string, receiverId: string) {
  const { error } = await supabase
    .from('connections')
    .insert({
      requester_id: requesterId,
      receiver_id: receiverId,
      status: 'pending'
    });

  if (error) {
    console.error("Error sending request:", error);
    throw error;
  }

  revalidatePath('/dashboard/network');
  return true;
}

export async function acceptConnectionRequest(connectionId: string) {
  const { error } = await supabase
    .from('connections')
    .update({ status: 'accepted' })
    .eq('id', connectionId);

  if (error) {
    console.error("Error accepting request:", error);
    throw error;
  }

  revalidatePath('/dashboard/network');
  return true;
}

export async function rejectConnectionRequest(connectionId: string) {
  const { error } = await supabase
    .from('connections')
    .update({ status: 'rejected' })
    .eq('id', connectionId);

  if (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }

  revalidatePath('/dashboard/network');
  return true;
}

export async function removeConnection(connectionId: string) {
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId);

  if (error) {
    console.error("Error removing connection:", error);
    throw error;
  }

  revalidatePath('/dashboard/network');
  return true;
}
