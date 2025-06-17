import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async () => {
    if (!email) {
      toast.error('Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setIsLoading(true);
      await authService.requestRecoveryCode(email);
      toast.success('Código de recuperación enviado a tu correo');
      setStep('verify');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al solicitar código de recuperación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndReset = async () => {
    if (!code || !newPassword || !confirmPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      setIsLoading(true);
      await authService.verifyAndUpdatePassword({
        email,
        code,
        new_password: newPassword
      });
      toast.success('Contraseña actualizada exitosamente');
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al actualizar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className={`w-full ${theme.spacing.container.default} max-w-[512px]}`}>
        <div className="flex justify-center mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-[${theme.colors.primary.light}] flex items-center justify-center`}>
            <span className={`text-[${theme.colors.text.dark}] text-2xl font-bold`}>CQ</span>
          </div>
        </div>
        <h2 className={`${theme.typography.heading.h2} text-${theme.colors.text.primary} text-center mb-8`}>
          {step === 'request' ? '¿Olvidaste tu contraseña?' : 'Verificar código'}
        </h2>
        <p className={`${theme.typography.body.default} text-${theme.colors.text.secondary} text-center mb-6`}>
          {step === 'request'
            ? 'Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.'
            : 'Ingresa el código que recibiste en tu correo y tu nueva contraseña.'}
        </p>
        <div className="space-y-4">
          {step === 'request' ? (
            <>
              <Input
                type="email"
                id="email"
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                onClick={handleRequestReset}
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar código'}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                id="code"
                label="Código de verificación"
                placeholder="Ingresa el código recibido"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                id="newPassword"
                label="Nueva contraseña"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                id="confirmPassword"
                label="Confirmar contraseña"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button
                onClick={handleVerifyAndReset}
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
              </Button>
            </>
          )}
          <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
            ¿Recordaste tu contraseña?{' '}
            <Link
              to="/login"
              className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;