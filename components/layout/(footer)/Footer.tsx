import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div>
      <footer className={`fixed bottom-0 left-0 w-full bg-white text-black ${styles.footerHeight}`}>
        <div className="flex justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-1">
          <button className="hover:bg-blue-600 text-black font-semibold py-1 px-2 rounded">
            1
          </button>
          <button className="mx-1 sm:mx-2 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded">
            2
          </button>
          <button className="mx-1 sm:mx-2 hover:bg-yellow-600 text-black font-semibold py-1 px-2 rounded">
            3
          </button>
          <button className="mx-1 sm:mx-2 hover:bg-red-600 text-black font-semibold py-1 px-2 rounded">
            4
          </button>
          <button className="hover:bg-purple-600 text-black font-semibold py-1 px-2 rounded">
            5
          </button>
        </div>
      </footer>
    </div>
  );
}
