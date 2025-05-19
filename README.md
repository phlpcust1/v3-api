# Curriculum Advising API

## Installation

#### 1. Make sure you have the necessary requirements.

- Nodejs v20+
- Pnpm
- PostgreSQL v16+

#### 2. Create a postgresql database with the name "curriculum_advising"

#### 3. Download the zip file or clone the repository to your local machine

```bash
git clone https://github.com/sovanreign/curriculum-advising-api.git
```

#### 4. Install the dependencies using "pnpm install"

#### 5. Create .env file in the root folder and add the following

```dotenv
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/curriculum_advising"
PORT=8000

JWT_SECRET_KEY=mapakode
JWT_EXPIRES_IN=15d
```

Note: make sure to replace **\<username>** and **\<password>** with your postgresql credentials

#### 6. Run "npx prisma migrate dev" in the terminal

#### 7. Load the initial data

```bash
pnpm run seed
```

#### 8. Run the application

```bash
pnpm run start:dev
```

### Note:

check postman-import.json for Postman API routes and upload-students and upload-coaches csv file for uploading a csv.
"# v3-api" 
