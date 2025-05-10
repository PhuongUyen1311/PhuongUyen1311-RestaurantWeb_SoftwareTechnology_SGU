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
  console.log('Đọc file từ:', userFile);

  if (!fs.existsSync(userFile)) {
    console.error('❌ File không tồn tại');
    throw new Error('File users.json không tồn tại');
  }

  try {
    const data = fs.readFileSync(userFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Lỗi đọc file hoặc JSON parse:', error);
    throw new Error('Không thể đọc hoặc parse dữ liệu người dùng');
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
        return { success: false, message: 'Email hoặc mật khẩu không đúng' };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error('Lỗi trong hàm login:', error);
      return {
        success: false,
        message: 'Lỗi hệ thống: Không thể xử lý đăng nhập',
      };
    }
  }
}
