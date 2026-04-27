import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { LeaderboardPage } from '@/pages/leaderboard';
import './styles/global.css';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <LeaderboardPage />
    </FluentProvider>
  );
}
