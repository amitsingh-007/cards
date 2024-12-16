'use client';

import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="pt-20">
      <Loader2 className="animate-spin mx-auto h-12 w-12" />
    </div>
  );
};

export default Loading;
