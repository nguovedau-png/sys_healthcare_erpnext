import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { contentService, Banner } from '@/services/content.service';
import Card from '@/components/ui/Card';
import { Title } from '@/components/ui/Typography';

interface InfographicItem {
  slug: string;
  thumbnail: string;
  title: string;
}

const Infographic: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfographics = async () => {
      try {
        const result = await contentService.getBanners({ position: 'infographic' });
        setBanners(result || []);
      } catch (error) {
        console.error('Error fetching infographics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfographics();
  }, []);

  const data: InfographicItem[] = banners.map((b) => ({
    slug: b.link || '/',
    thumbnail: b.image || '',
    title: b.title || '',
  }));

  if (loading || !data.length) {
    return null;
  }

  return (
    <div className="mt-8 md:mt-0 relative overflow-hidden md:overflow-visible">
      <div className="flex flex-wrap -mx-[10px]">
        {_.map(data, (item: InfographicItem, i: number) =>
          <div className="w-1/2 lg:w-1/3 xl:w-1/5 px-[10px] mb-5" key={i}>
            <Link href={item.slug} className="block group">
              <Card className="p-0 overflow-hidden rounded-lg shadow-sm group-hover:shadow-soft transition-all duration-300 border-none relative bg-slate-900 h-full">
                <div className="aspect-[10/16] relative w-full">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="w-full transform translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                      <div className="w-10 h-1 bg-primary rounded-full mb-3 mx-auto"></div>
                      <Title level={5} className="text-white m-0 text-center font-bold leading-snug drop-shadow-md line-clamp-3">
                        {item.title}
                      </Title>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infographic;