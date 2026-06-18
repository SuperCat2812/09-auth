type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section>
      <div className="main">
        <aside>{sidebar}</aside>
        {children}
      </div>
    </section>
  );
}
