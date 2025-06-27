import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';
import { PlaylistProvider } from '@/Track/trackContext';

export const metadata = {
  title: 'My Page Title',
  description: 'Description of my page',
};

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ReduxProvider>
        <body className={`${montserrat.variable}`}>
          <PlaylistProvider>{children} </PlaylistProvider>
        </body>
      </ReduxProvider>
    </html>
  );
}
