
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const q = query(collection(db, 'applications'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const applications = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
      };
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, 'applications'), {
      ...body,
      timestamp: serverTimestamp(),
      status: body.status || 'pending'
    });
    return NextResponse.json({ id: docRef.id, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
