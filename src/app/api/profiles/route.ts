
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, setDoc, doc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const q = query(collection(db, 'profiles'), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    const profiles = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt
      };
    });
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Use name as ID for simplicity or generated ID
    const profileId = body.name.toLowerCase().replace(/\s+/g, '-');
    await setDoc(doc(db, 'profiles', profileId), {
      ...body,
      updatedAt: serverTimestamp()
    });
    return NextResponse.json({ id: profileId, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
