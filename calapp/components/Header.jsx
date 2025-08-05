import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '20px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px', color: '#2d3748' }}>
        Calendar
      </h1>
      <ThemeToggle />
    </header>
  );
}
