
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MOCK_SI_PARTNERS } from '@/lib/mock-data';
import { SiPartnerCard } from '@/components/search/si-partner-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';

const REGIONS = ['All', 'Seoul', 'Gyeonggi', 'Busan', 'Daegu', 'Incheon'];
const BRANDS = ['Samsung SDS', 'LG CNS', 'SK C&C', 'Hyundai AutoEver', 'CJ OliveNetworks'];
const TAGS = ['Smart Factory', 'Cloud', 'AI', 'ERP', 'Security', 'IoT'];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get('brands')?.split(',').filter(Boolean) || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.get('tags')?.split(',').filter(Boolean) || []);
  const [onlyBadge, setOnlyBadge] = useState(searchParams.get('badge') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedRegion !== 'All') params.set('region', selectedRegion);
    if (selectedBrands.length > 0) params.set('brands', selectedBrands.join(','));
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (onlyBadge) params.set('badge', 'true');
    params.set('sort', sortBy);
    params.set('page', page.toString());
    
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedRegion, selectedBrands, selectedTags, onlyBadge, sortBy, page, router]);

  const filteredPartners = useMemo(() => {
    return MOCK_SI_PARTNERS.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = selectedRegion === 'All' || p.region === selectedRegion;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchTags = selectedTags.length === 0 || selectedTags.every(tag => p.tags.includes(tag));
      const matchBadge = !onlyBadge || p.hasBadge;
      return matchSearch && matchRegion && matchBrand && matchTags && matchBadge;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'success') return b.successRate - a.successRate;
      return 0;
    });
  }, [searchTerm, selectedRegion, selectedBrands, selectedTags, onlyBadge, sortBy]);

  const pageSize = 10;
  const paginatedPartners = filteredPartners.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPartners.length / pageSize);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All');
    setSelectedBrands([]);
    setSelectedTags([]);
    setOnlyBadge(false);
    setPage(1);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-primary">SI Partner Directory</h1>
            <p className="text-sm text-ink-muted">Find the perfect integration partner for your project.</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
              <Input 
                placeholder="Search by company name..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SlidersHorizontal className="mr-2 size-4 text-ink-muted" />
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
          <aside className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-ink-primary">
                <Filter className="size-4" /> Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-ink-muted h-8">
                Reset
              </Button>
            </div>

            <Separator className="bg-ink-border" />

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Region</h4>
              <Select value={selectedRegion} onValueChange={(val) => { setSelectedRegion(val); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-ink-border" />

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Brands</h4>
              <div className="grid grid-cols-1 gap-3">
                {BRANDS.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)} 
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm font-medium text-ink-primary cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-ink-border" />

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Verification</h4>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="badge" 
                  checked={onlyBadge} 
                  onCheckedChange={(checked) => { setOnlyBadge(!!checked); setPage(1); }} 
                />
                <label htmlFor="badge" className="text-sm font-medium text-ink-primary cursor-pointer">
                  Verified Partners Only
                </label>
              </div>
            </div>

            <Separator className="bg-ink-border" />

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <Badge 
                    key={tag} 
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-ink-surface text-ink-primary border-none">
                {filteredPartners.length} Results
              </Badge>
              {selectedTags.map(tag => (
                <Badge key={tag} className="gap-1 rounded-md bg-primary-600 text-white border-none">
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
              <div className="flex flex-col items-center justify-center py-24 bg-ink-surface/30 rounded-xl border border-dashed border-ink-border">
                <Search className="size-12 text-ink-border mb-4" />
                <h3 className="text-lg font-medium text-ink-primary">No results found</h3>
                <p className="text-sm text-ink-muted">Try adjusting your filters or search keywords.</p>
                <Button variant="ghost" onClick={clearFilters} className="mt-4 text-primary-600 font-medium">Clear all filters</Button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-12">
                <Button variant="secondary" size="icon" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button key={i} variant={page === i + 1 ? 'default' : 'ghost'} size="sm" className="w-9" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button variant="secondary" size="icon" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
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
