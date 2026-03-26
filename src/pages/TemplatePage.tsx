import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import { useReportStore } from '../store/reportStore';
import { useConfirm } from '../components/ui/ConfirmDialog';

export default function TemplatePage() {
  const { templates, addTemplate, deleteTemplate } = useReportStore();
  const { confirm } = useConfirm();
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tasks.trim()) return;
    addTemplate(name.trim(), tasks.split('\n').map((t) => t.trim()).filter(Boolean));
    setName(''); setTasks('');
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({ title: 'テンプレートを削除', message: 'このテンプレートを削除してもよろしいですか？', confirmLabel: '削除', variant: 'danger' });
    if (!ok) return;
    deleteTemplate(id);
  };

  return (
    <PageTransition className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-foreground">テンプレート</h1>
      <form onSubmit={handleAdd} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="テンプレート名" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50" />
        <textarea value={tasks} onChange={(e) => setTasks(e.target.value)} rows={4} placeholder="タスク（1行1項目）" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-zinc-500 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500/50" />
        <button type="submit" className="bg-accent-600 hover:bg-accent-500 text-on-accent px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" />追加</button>
      </form>
      <div className="space-y-2">
        {templates.map((t) => (
          <div key={t.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 flex items-center justify-between group">
            <div><p className="text-sm font-medium text-foreground">{t.name}</p><p className="text-xs text-zinc-500 mt-0.5">{t.tasks.join(' / ')}</p></div>
            <button onClick={() => handleDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
