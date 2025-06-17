'use server'

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

type Rsvp = {
  id: string;
  name: string;
  attendees: number;
  timestamp: number;
};

export async function submitRsvp(name: string, attendees: number) {
  try {
    const id = Date.now().toString();
    const rsvp: Rsvp = {
      id,
      name,
      attendees,
      timestamp: Date.now(),
    };
    
    // Store in Vercel KV (Redis)
    await kv.hset('rsvps', { [id]: JSON.stringify(rsvp) });
    
    // Update the total count
    const currentTotal = await kv.get('total_attendees') || 0;
    await kv.set('total_attendees', Number(currentTotal) + attendees);
    
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error };
  }
}

export async function getRsvps() {
  try {
    const rsvps = await kv.hgetall('rsvps');
    if (!rsvps) return [];
    
    return Object.values(rsvps)
      .map(rsvp => JSON.parse(rsvp as string) as Rsvp)
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return [];
  }
}

export async function getTotalAttendees() {
  try {
    return await kv.get('total_attendees') || 0;
  } catch (error) {
    console.error('Error fetching total attendees:', error);
    return 0;
  }
}

export async function checkAdminPassword(password: string) {
  // In production, use a proper hashed password stored in environment variables
  const correctPassword = process.env.ADMIN_PASSWORD || 'pack131admin';
  return password === correctPassword;
}