import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/utils/password-encryption.util';

const prisma = new PrismaClient();

async function main() {
  // ADD SCHOOL TERM
  // Copy and add the code below (replace with your name of school term)
  // {
  //     name: '1st Sem. S/Y 2023-2024',
  //  },
  await prisma.schoolTerm.createMany({
    data: [
      {
        name: '1st Sem. S/Y 2021-2022',
      },
      {
        name: '2nd Sem. S/Y 2021-2022',
      },
      {
        name: 'Summer 2022',
      },
      {
        name: '1st Sem. S/Y 2022-2023',
      },
      {
        name: '2nd Sem. S/Y 2022-2023',
      },
      {
        name: 'Summer 2023',
      },
      {
        name: '1st Sem. S/Y 2023-2024',
      },
      {
        name: '2nd Sem. S/Y 2023-2024',
      },
      {
        name: 'Summer 2024',
      },
      {
        name: '1st Sem. S/Y 2024-2025',
      },
      {
        name: '2nd Sem. S/Y 2024-2025',
      },
      {
        name: 'Summer 2025',
      },
    ],
  });

  await prisma.department.create({
    data: {
      code: 'SCIS',
      name: 'School of Computer in Information Sciences',
    },
  });

  const pass = await passwordEncryption('password');
  await prisma.dean.create({
    data: {
      username: 'admin',
      password: pass,
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      deanId: '01-1947',
      email: 'metaverse@gmail.com',
      address: 'Silicon Valley',
      contact: '+0187654321',
      departmentId: 1,
    },
  });

  await prisma.head.create({
    data: {
      username: 'programhead',
      password: pass,
      firstName: 'Elon',
      lastName: 'Musk',
      headId: '01-1999',
      email: 'spacex@gmail.com',
      address: 'Silicon Valley',
      contact: '+0187654321',
      departmentId: 1,
    },
  });

  const programs = [
    {
      uniqueId: 'BSIT',
      code: 'BSIT',
      name: 'Bachelor of Science in Information Technology',
      departmentId: 1,
    },
    {
      uniqueId: 'ACT',
      code: 'ACT',
      name: 'Associate in Computer Technology',
      departmentId: 1,
    },
    {
      uniqueId: 'BLIS',
      code: 'BLIS',
      name: 'Bachelor of Library Information Science',
      departmentId: 1,
    },
    {
      uniqueId: 'BSCS',
      code: 'BSCS',
      name: 'Bachelor of Science in Computer Science',
      departmentId: 1,
    },
  ];

  await prisma.program.createMany({
    data: programs,
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
