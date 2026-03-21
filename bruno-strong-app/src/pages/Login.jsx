import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Introduce tu nombre.');
          setLoading(false);
          return;
        }
        await signup(email, password, name);
      }
      navigate('/');
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'No existe una cuenta con este email.',
        'auth/wrong-password': 'Contrasena incorrecta.',
        'auth/email-already-in-use': 'Ya existe una cuenta con este email.',
        'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres.',
        'auth/invalid-email': 'Email no valido.',
        'auth/invalid-credential': 'Credenciales incorrectas.',
      };
      setError(messages[err.code] || `Error: ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 6.5h11v11h-11z" /><path d="M3 3v4" /><path d="M3 3h4" /><path d="M21 3v4" /><path d="M21 3h-4" /><path d="M3 21v-4" /><path d="M3 21h4" /><path d="M21 21v-4" /><path d="M21 21h-4" />
          </svg>
        </div>
        <h1 className="auth-title">Bruno Strong</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Inicia sesion para continuar' : 'Crea tu cuenta'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="label">Nombre</label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
          )}
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Contrasena</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 caracteres"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} disabled={loading}>
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesion' : 'Crear cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <span>No tienes cuenta? <span className="auth-link" onClick={() => { setIsLogin(false); setError(''); }}>Registrate</span></span>
          ) : (
            <span>Ya tienes cuenta? <span className="auth-link" onClick={() => { setIsLogin(true); setError(''); }}>Inicia sesion</span></span>
          )}
        </div>
      </div>
    </div>
  );
}
