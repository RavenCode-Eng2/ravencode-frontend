import React, { useEffect, useState } from 'react';
import { judgeService, SubmissionResponse, Problem } from '../services/judgeService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom';

const MySubmissions: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionResponse[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.Correo_electronico) return;
      setLoading(true);
      try {
        const [subs, probs] = await Promise.all([
          judgeService.getSubmissions(user.Correo_electronico),
          judgeService.getProblems()
        ]);
        console.log('Submissions recibidas:', subs);
        console.log('Primera submission:', subs[0]);
        setSubmissions(subs);
        setProblems(probs);
      } catch (error) {
        console.error('Error al cargar submissions:', error);
        toast.error('Error al cargar submissions o problemas');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (submissionId: string) => {
    if (!user?.Correo_electronico) return;
    
    // Confirmar antes de eliminar
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta submission? Esta acción no se puede deshacer.');
    if (!confirmed) return;
    
    try {
      console.log('Intentando eliminar submission:', submissionId);
      await judgeService.deleteSubmission(submissionId, user.Correo_electronico);
      setSubmissions(submissions.filter(s => s._id !== submissionId));
      toast.success('Submission eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar submission:', error);
      toast.error('Error al eliminar submission');
    }
  };

  // Agrupar submissions por problema
  const submissionsByProblem: { [problemId: string]: SubmissionResponse[] } = {};
  submissions.forEach(sub => {
    if (!submissionsByProblem[sub.problem_id]) submissionsByProblem[sub.problem_id] = [];
    submissionsByProblem[sub.problem_id].push(sub);
  });

  const getProblemTitle = (problemId: string) => {
    const prob = problems.find(p => p._id === problemId);
    return prob ? prob.title : problemId;
  };

  return (
    <div className="layout-container flex flex-col max-w-[960px] mx-auto py-8">
      <h1 className="text-white text-3xl font-bold mb-6">Mis Submissions</h1>
      {loading ? (
        <div className="text-white">Cargando...</div>
      ) : (
        Object.keys(submissionsByProblem).length === 0 ? (
          <div className="text-white">No tienes submissions registradas.</div>
        ) : (
          Object.entries(submissionsByProblem).map(([problemId, subs]) => (
            <div key={problemId} className="mb-8 bg-[#1a2332] rounded-lg p-6">
              <h2 className="text-xl text-green-400 font-bold mb-4">{getProblemTitle(problemId)}</h2>
              <div className="space-y-4">
                {subs.map(sub => (
                  <div key={sub._id} className="bg-[#232b3b] rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-white font-semibold">Fecha: {new Date(sub.created_at).toLocaleString()}</div>
                      <div className="text-gray-300">Estado: {sub.status}</div>
                      <div className="text-gray-300">Score: {sub.score ?? '-'} | Tiempo: {sub.execution_time ?? '-'}ms</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setExpanded(expanded === sub._id ? null : sub._id)}
                      >
                        {expanded === sub._id ? 'Ocultar código' : 'Ver código'}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDelete(sub._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                    {expanded === sub._id && (
                      <div className="mt-4 w-full">
                        <div className="mb-2 text-sm text-gray-400">
                          Lenguaje: {sub.language} | Código ({sub.code?.length || 0} caracteres)
                        </div>
                        <div className="mb-2 text-xs text-gray-500">
                          Debug: {JSON.stringify({ hasCode: !!sub.code, codeLength: sub.code?.length, codePreview: sub.code?.substring(0, 50) })}
                        </div>
                        {sub.code ? (
                          <CodeMirror
                            value={sub.code}
                            height="200px"
                            theme={dracula}
                            extensions={[python(), javascript()]}
                            readOnly
                          />
                        ) : (
                          <div className="bg-gray-800 p-4 rounded text-gray-400">
                            No hay código disponible para mostrar
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )
      )}
      <div className="mt-8">
        <Link to="/dashboard">
          <Button size="md" variant="primary">Volver al Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default MySubmissions; 