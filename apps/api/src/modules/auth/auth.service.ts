import type { FastifyInstance } from 'fastify';
import { User } from '../../models/user.model.js';
import type { SignupInput, LoginInput } from './auth.schema.js';

export class AuthService {
  constructor(private app: FastifyInstance) {}

  async signup(input: SignupInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw { statusCode: 409, message: 'Email already registered' };
    }

    const user = await User.create({
      email: input.email,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
      phone: input.phone,
    });

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.app.jwt.sign(tokenPayload);
    const refreshToken = this.app.jwt.sign(tokenPayload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email }).select('+password');
    if (!user) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const isValidPassword = await user.comparePassword(input.password);
    if (!isValidPassword) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    user.lastLoginAt = new Date();
    await user.save();

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.app.jwt.sign(tokenPayload);
    const refreshToken = this.app.jwt.sign(tokenPayload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user;
  }
}
