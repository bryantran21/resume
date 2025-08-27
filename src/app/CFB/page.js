'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CFB() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEnrollPrompt, setShowEnrollPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEnrollment = async () => {
      const userId = sessionStorage.getItem('userId');
      console.log('[checkEnrollment] userId:', userId);
      if (!userId) {
        console.log('[checkEnrollment] No userId, redirecting to /login');
        return router.replace('/login');
      }

      try {
        console.log('[checkEnrollment] Fetching /api/cfb?userId=' + userId);
        const res = await fetch(`/api/cfb?userId=${userId}`);
        if (!res.ok) {
          console.log('[checkEnrollment] API not ok:', res.status);
          setError('Enrollment API not found');
          setLoading(false);
          return;
        }
        const data = await res.json();
        console.log('[checkEnrollment] API response:', data);

        const { enrolled } = data;

        if (!enrolled) {
          console.log('[checkEnrollment] Not enrolled, showing enroll prompt');
          setShowEnrollPrompt(true);
          setLoading(false);
        } else {
          console.log('[checkEnrollment] Enrolled, loading rankings');
          loadRankings();
        }
      } catch (err) {
        console.error('[checkEnrollment] Error:', err);
        setError('Failed to verify enrollment');
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [router]);

  const loadRankings = async () => {
    try {
      console.log('[loadRankings] Fetching /api/cfb');
      const res = await fetch('/api/cfb');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log('[loadRankings] Rankings data:', data);
      setRankings(data);
    } catch (err) {
      console.error('[loadRankings] Error:', err);
      setError('Failed to load rankings');
    } finally {
      console.log('[loadRankings] Finished loading rankings');
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    const userId = sessionStorage.getItem('userId');
    console.log('[handleEnroll] userId:', userId);
    try {
      console.log('[handleEnroll] Posting to /api/cfb');
      const res = await fetch('/api/cfb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        console.log('[handleEnroll] Failed to enroll:', res.status);
        throw new Error('Failed to enroll');
      }
      console.log('[handleEnroll] Enroll success, hiding prompt and loading rankings');
      setShowEnrollPrompt(false);
      loadRankings();
    } catch (err) {
      console.error('[handleEnroll] Enrollment error:', err);
      setError('Enrollment failed');
    }
  };

  if (loading) {
    console.log('[render] Loading...');
    return <p className="text-white">Loading...</p>;
  }
  if (error) {
    console.log('[render] Error:', error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">College Football Dashboard</h1>

      {showEnrollPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enroll in CFB Tournament?</h2>
            <p className="mb-4 text-gray-300">You must be enrolled to view rankings and participate.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              <button
                onClick={handleEnroll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  router.replace('/menu');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Rankings Modal */}
      <button
        onClick={() => {
          console.log('[RankingsModal] Show button clicked');
          setShowModal(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6"
      >
        Show AP Top 25 Rankings
      </button>

      {/* Rankings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">AP Top 25 Rankings</h2>
              <button
                onClick={() => {
                  console.log('[RankingsModal] Close button clicked');
                  setShowModal(false);
                }}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3">
              {rankings.map((team) => (
                <li
                  key={team.team?.id || team.rank}
                  className="bg-gray-800 p-4 rounded-xl shadow-md"
                >
                  <div className="text-lg font-semibold">
                    #{team.current} - {team.team?.nickname || 'Unknown Team'}
                  </div>
                  <div className="text-sm text-gray-400">
                    Nickname: {team.team?.name || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-400">
                    Record: {team.recordSummary || 'N/A'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Placeholder for Spreads */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">Matchups & Spreads</h2>
        <div className="bg-yellow-800 text-yellow-200 p-6 rounded-xl shadow-inner">
          <p className="text-center text-lg font-semibold">
            🚧 Under Construction
          </p>
          <p className="text-sm text-center text-yellow-300">
            This section will display betting lines and upcoming matchups.
          </p>
        </div>
      </section>
    </div>
  );
}
