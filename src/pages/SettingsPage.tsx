import PageTransition from '../components/ui/PageTransition';

export default function SettingsPage() {
  return (
    <PageTransition className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-foreground">設定</h1>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">通知</h2>
        <div><label className="text-xs text-zinc-500 block mb-1">リマインダー時間</label>
          <input defaultValue="17:30" type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-foreground" /></div>
        <div><label className="text-xs text-zinc-500 block mb-1">送信先チャンネル</label>
          <input defaultValue="#daily-report" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-foreground" /></div>
      </div>
      <button className="bg-accent-600 hover:bg-accent-500 text-on-accent px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">保存する</button>
    </PageTransition>
  );
}
