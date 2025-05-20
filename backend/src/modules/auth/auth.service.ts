import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface User {
  email: string;
  password: string;
  name: string;
}

const userFile = path.join(process.cwd(), 'src/storage/users.json');

@Injectable()
export class AuthService {
  private readUsers(): User[] {
  console.log('Read file from:', userFile);
  try {
    const data = fs.readFileSync(userFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error file!:', error);
    throw new Error('Can not read and parse the data of user');
  }
}

  login(email: string, password: string): {
    success: boolean;
    message: string;
    user?: Omit<User, 'password'>;
  } {
    try {
      const users = this.readUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        return { success: false, message: '* Incorrect email or password. Try again!' };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error('Lỗi', error);
      return {
        success: false,
        message: 'Lỗi hệ thống: Không thể xử lý đăng nhập',
      };
    }
  }

  clearLoginSession(): { success: boolean; message: string } {
  return {
    success: true,
    message: 'Đã xoá trạng thái đăng nhập (mocked)',
  };
}

  register(newUser: User): { success: boolean; message: string } {
  try {
    const users = this.readUsers();

    const exists = users.some(u => u.email === newUser.email);
    if (exists) {
      return { success: false, message: 'Email đã được đăng ký.' };
    }

    users.push(newUser);
    fs.writeFileSync(userFile, JSON.stringify(users, null, 2), 'utf-8');

    return { success: true, message: 'Đăng ký thành công.' };
  } catch (error) {
    console.error('Lỗi ghi file:', error);
    return { success: false, message: 'Không thể ghi dữ liệu người dùng.' };
  }
}

}
