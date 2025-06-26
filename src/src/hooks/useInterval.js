import { useEffect, useRef } from 'react';

/**
 * @param {() => void} callback  毎 tick 呼ばれる関数
 * @param {number|null} delay   ミリ秒。null で停止
 */
export default function useInterval(callback, delay) {
  const savedCb = useRef(callback);
  // 最新の callback を常に参照
  useEffect(() => { savedCb.current = callback; }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCb.current(), delay);
    return () => clearInterval(id);   // クリーンアップ
  }, [delay]);
}
