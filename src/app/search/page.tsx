
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MOCK_SI_PARTNERS, SiPartner } from '@/lib/mock-data';
import { SiPartnerCard } from '@/components/search/si-partner-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';

const REGIONS = ['전체', '서울', '경기', '부산', '대구', '인천'];
const TAGS = ['Smart Factory', 'Cloud', 'AI', 'ERP', 'Security', 'IoT'];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '전체');
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.get('tags')?.split(',') || []);
  const [onlyBadge, setOnlyBadge] = useState(searchParams.get('badge') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  // Sync with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedRegion !== '전체') params.set('region', selectedRegion);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (onlyBadge) params.set('badge', 'true');
    params.set('sort', sortBy);
    params.set('page', page.toString());
    
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedRegion, selectedTags, onlyBadge, sortBy, page, router]);

  const filteredPartners = useMemo(() => {
    return MOCK_SI_PARTNERS.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = selectedRegion === '전체' || p.region === selectedRegion;
      const matchTags = selectedTags.length === 0 || selectedTags.every(tag => p.tags.includes(tag));
      const matchBadge = !onlyBadge || p.hasBadge;
      return matchSearch && matchRegion && matchTags && matchBadge;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'success') return b.successRate - a.successRate;
      return 0;
    });
  }, [searchTerm, selectedRegion, selectedTags, onlyBadge, sortBy]);

  const pageSize = 10;
  const paginatedPartners = filteredPartners.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPartners.length / pageSize);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('전체');
    setSelectedTags([]);
    setOnlyBadge(false);
    setPage(1);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline">SI Partner Directory</h1>
            <p className="text-muted-foreground">Find the best integration partners for your project.</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal className="mr-2 size-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="success">Success Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <aside className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Filter className="size-4" /> Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground h-8">
                Reset all
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Region</h4>
              <Select value={selectedRegion} onValueChange={(val) => { setSelectedRegion(val); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Verified Badge</h4>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="badge" 
                  checked={onlyBadge} 
                  onCheckedChange={(checked) => { setOnlyBadge(!!checked); setPage(1); }} 
                />
                <label htmlFor="badge" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Verified Partners Only
                </label>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Capabilities</h4>
              <div className="grid grid-cols-1 gap-3">
                {TAGS.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tag-${tag}`} 
                      checked={selectedTags.includes(tag)} 
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label htmlFor={`tag-${tag}`} className="text-sm font-medium leading-none">
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="rounded-md">{filteredPartners.length} results</Badge>
              {selectedTags.map(tag => (
                <Badge key={tag} className="gap-1 rounded-md">
                  {tag} <X className="size-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                </Badge>
              ))}
            </div>

            {paginatedPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedPartners.map(partner => (
                  <SiPartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                <Search className="size-12 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold">No partners found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">Clear all filters</Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button 
                      key={i} 
                      variant={page === i + 1 ? 'default' : 'ghost'} 
                      size="sm"
                      className="w-8"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={page === totalPages} 
                  onClick={() => setPage(p => p + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
