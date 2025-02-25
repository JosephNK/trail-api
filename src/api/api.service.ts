import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ApiService {
  async delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async findResourceById(id: string): Promise<{ id: string; data: any }> {
    // 데이터베이스 조회 시뮬레이션
    await this.delay(100);

    // ID가 '999'인 리소스는 존재하지 않는 것으로 가정
    if (id === '999') {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return {
      id,
      data: {
        name: `Resource ${id}`,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
