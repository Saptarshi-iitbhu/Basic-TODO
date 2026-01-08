import React, { useState, useEffect } from 'react';
import api from '../api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Plus, Trash2, CheckCircle2, ClipboardList } from 'lucide-react';

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    const fetchTodos = async () => {
        try {
            const res = await api.get('/todo');
            setTodos(res.data.todos);
        } catch (err) {
            console.error('Failed to fetch todos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTodo.title) return;

        setCreateLoading(true);
        try {
            await api.post('/todo', {
                title: newTodo.title,
                description: newTodo.description || "No description"
            });
            setNewTodo({ title: '', description: '' });
            fetchTodos();
        } catch (err) {
            console.error('Failed to create todo:', err);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/todo/${id}`);
            setTodos(todos.filter(t => t._id !== id));
        } catch (err) {
            console.error('Failed to delete todo:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Tasks</h1>
                    <p className="text-slate-400 mt-1">Manage your daily goals and to-dos</p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-slate-300">
                    {todos.length} Active Tasks
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-start md:items-stretch">
                    <div className="flex-1 space-y-4 w-full">
                        <Input
                            placeholder="What needs to be done?"
                            value={newTodo.title}
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        />
                        <Input
                            placeholder="Add extra details (optional)"
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                            className="text-slate-400"
                        />
                    </div>
                    <Button type="submit" className="w-full md:w-auto md:h-auto whitespace-nowrap" isLoading={createLoading}>
                        <Plus className="w-5 h-5 mr-2" /> Add Task
                    </Button>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-400">Loading your tasks...</p>
                </div>
            ) : todos.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/50 border-dashed">
                    <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                        <ClipboardList className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No tasks yet</h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                        Get started by adding your first task above. Stay organized and productive!
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {todos.map((todo) => (
                        <div
                            key={todo._id}
                            className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:bg-slate-900 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 flex items-start gap-4"
                        >
                            <button
                                onClick={() => handleDelete(todo._id)}
                                className="mt-1 w-6 h-6 rounded-full border-2 border-slate-600 hover:border-green-500 hover:bg-green-500/10 flex items-center justify-center transition-colors group/check shrink-0"
                            >
                                <CheckCircle2 className="w-4 h-4 text-transparent group-hover/check:text-green-500 transition-colors" />
                            </button>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium text-white truncate pr-4">{todo.title}</h3>
                                {todo.description && (
                                    <p className="text-slate-400 mt-1 break-words text-sm">{todo.description}</p>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(todo._id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
