import '@zoomus/websdk/dist/css/bootstrap.css';
import '@zoomus/websdk/dist/css/react-select.css';

export default function ZoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="zoom-container">
      {children}
    </div>
  );
}