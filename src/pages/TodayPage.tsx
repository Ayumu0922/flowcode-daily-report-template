import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useReportStore, type DailyReport } from '../store/reportStore';
import { useToast } from '../components/ui/Toast';

const moods = ['😫', '😟', '😐', '🙂', '😄'];

export default function TodayPage() {
  const { addReport, templates } = useReportStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<DailyReport['tasks']>([{ title: '', status: 'done', hours: 1 }]);
  const [achievements, setAchievements] = useState('');
  const [issues, setIssues] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [mood, setMood] = useState<1|2|3|4|5>(3);

  const addTask = () => setTasks([...tasks, { title: '', status: 'done', hours: 1 }]);
  const removeTask = (i: number) => setTasks(tasks.filter((_, idx) => idx !== i));
  const updateTask = (i: number, data: Partial<DailyReport['tasks'][0]>) => setTasks(tasks.map((t, idx) => idx === i ? { ...t, ...data } : t));

  const loadTemplate = (templateId: string) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (tmpl) setTasks(tmpl.tasks.map((t) => ({ title: t, status: 'done' as const, hours: 1 })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({ date: new Date().toISOString().split('T')[0], author: '自分', tasks: tasks.filter((t) => t.title), achievements, issues, tomorrow, mood });
    showToast('日報を提出しました', 'success');
    navigate('/timeline');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">今日の日報</h1>
        {templates.length > 0 && (
          <select onChange={(e) => loadTemplate(e.target.value)} defaultValue="" className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white">
            <option value="" disabled>テンプレートを使用</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-semibold text-white mb-2">今日のタスク</h2>
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <input value={task.title} onChange={(e) => updateTask(i, { title: e.target.value })} placeholder="タスク内容"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50" />
              <select value={task.status} onChange={(e) => updateTask(i, { status: e.target.value as any })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-2 text-sm text-white">
                <option value="done">完了</option><option value="in-progress">進行中</option><option value="blocked">停滞</option>
              </select>
              <input value={task.hours} onChange={(e) => updateTask(i, { hours: Number(e.target.value) })} type="number" min="0.5" max="12" step="0.5"
                className="w-16 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-2 text-sm text-white text-center" />
              <span className="text-xs text-zinc-500">h</span>
              {tasks.length > 1 && <button type="button" onClick={() => removeTask(i)} className="text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>}
            </div>
          ))}
          <button type="button" onClick={addTask} className="flex items-center gap-1 text-sm text-accent-400 hover:text-accent-300"><Plus className="w-4 h-4" />タスクを追加</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div><label className="text-xs text-zinc-500 block mb-1">成果・気づき</label>
            <textarea value={achievements} onChange={(e) => setAchievements(e.target.value)} rows={2} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-accent-500/50" /></div>
          <div><label className="text-xs text-zinc-500 block mb-1">課題・困りごと</label>
            <textarea value={issues} onChange={(e) => setIssues(e.target.value)} rows={2} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-accent-500/50" /></div>
          <div><label className="text-xs text-zinc-500 block mb-1">明日の予定</label>
            <textarea value={tomorrow} onChange={(e) => setTomorrow(e.target.value)} rows={2} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-accent-500/50" /></div>
        </div>
        <div><label className="text-xs text-zinc-500 block mb-2">今日の調子</label>
          <div className="flex gap-3">{moods.map((m, i) => (
            <button key={i} type="button" onClick={() => setMood((i + 1) as any)}
              className={`text-2xl p-2 rounded-lg transition-all ${mood === i + 1 ? 'bg-accent-500/10 scale-110' : 'opacity-50 hover:opacity-100'}`}>{m}</button>
          ))}</div>
        </div>
        <button type="submit" className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">日報を提出</button>
      </form>
    </motion.div>
  );
}
