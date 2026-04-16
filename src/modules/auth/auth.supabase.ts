import {
  AuthOutput,
  MagicLinkDto,
  ResetPasswordRequestDto,
  SignInDto,
  SignUpDto,
  UpdatePasswordDto,
} from '@/modules/auth/auth.output'
import { Session } from '@/types/user'
import { CustomError } from '@/types/error'
import { supabase } from '@/config/supabase'

export class AuthSupabase implements AuthOutput {
  async signIn({ email, password }: SignInDto): Promise<{
    session: Session | null
    error: CustomError | null
  }> {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return Promise.resolve({ session, error })
  }

  async signUp({ email, password }: SignUpDto): Promise<{ error: CustomError | null }> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    return Promise.resolve({ error })
  }

  async signOut(): Promise<{ error: CustomError | null }> {
    const { error } = await supabase.auth.signOut()

    return Promise.resolve({ error })
  }

  async sendMagicLink({ email }: MagicLinkDto): Promise<{ error: CustomError | null }> {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })

    return Promise.resolve({ error })
  }

  async resetPasswordRequest({ email, redirectTo }: ResetPasswordRequestDto): Promise<{ error: CustomError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

    return Promise.resolve({ error })
  }

  async updatePassword({ password }: UpdatePasswordDto): Promise<{ error: CustomError | null }> {
    const { error } = await supabase.auth.updateUser({ password })

    return Promise.resolve({ error })
  }
}
