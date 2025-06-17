import MainLayout from '@/app/layout';

import Centerblock from './playlistOne';

interface PageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  // Получаем params
  const { categoryId } = params; // Получаем categoryId из params

  return (
    <MainLayout>
      <Centerblock categoryId={categoryId} />
    </MainLayout>
  );
}
