'use client';

import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks/use-debounce';

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(search, 300);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/?${createQueryString('q', debouncedSearch)}`);
    } else {
      router.push('/');
    }
  }, [debouncedSearch, createQueryString, router]);

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search images..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
} 