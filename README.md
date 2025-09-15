# EHR Integration Dashboard

A comprehensive Electronic Health Records (EHR) integration dashboard built with Next.js, TypeScript, and TailwindCSS. This application provides CRUD operations for healthcare workflows including patient management, appointment scheduling, clinical operations, and billing.

## Features

### Core Healthcare Workflows

#### Patient Management

- Search and retrieve patient records by name, ID, or other identifiers
- View complete patient information including demographics, medical history, allergies
- Update patient contact information and basic demographics
- Add or modify allergies and medical conditions
- Access medication lists and immunization records

#### Appointment Scheduling

- View appointments by date, provider, or patient
- Book new appointments with availability checking
- Reschedule or cancel existing appointments
- Check provider schedules and availability
- Handle appointment conflicts and overlaps

#### Clinical Operations

- Add clinical notes and documentation
- Record and update vital signs
- View lab results and diagnostic reports
- Access and update medication lists
- Add diagnoses and procedure codes
- Retrieve patient history and previous encounters

#### Billing & Administrative

- Check insurance eligibility and coverage
- View patient balances and payment history
- Access billing codes and fee schedules
- Generate basic reports and analytics

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom medical theme
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React Context + SWR for data fetching
- **Authentication**: Custom auth context with JWT tokens
- **API Integration**: Axios with custom API clients
- **Testing**: Jest + React Testing Library
- **Icons**: Heroicons + Lucide React

## Prerequisites

- Node.js 18+
- npm
- ProtonVPN account (for US proxy requirement)

## Project Deplyoment

[View project](https://ehr-integration-dashboard.vercel.app)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vishnuu5/EHR-Integration-Dashboard.git
cd ehr-integration-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the `.env` file and configure your environment variables:

Update the following variables in `.env`:

```bash
# DrChrono API Configuration
DRCHRONO_CLIENT_ID=
DRCHRONO_CLIENT_SECRET=
DRCHRONO_BASE_URL=https://drchrono.com/api/

# Epic FHIR Configuration
EPIC_BASE_URL=https://fhir.epic.com/
EPIC_USERNAME=
EPIC_PASSWORD=
```

### 4. Setup US Proxy (Required)

1. Download ProtonVPN: https://protonvpn.com/download
2. Login with provided credentials:
   - Username: `samdevil69`
   - Password: `aD%Z2j5ieCXTc^R`
3. Connect to a US server
4. Verify your IP is US-based

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Login to Dashboard

Use the demo credentials:

- **Username**: `admin`
- **Password**: `admin123`

## API Integrations

### DrChrono API

- **Base URL**: `https://drchrono.com/api/`
- **Authentication**: OAuth2 Client Credentials
- **Documentation**: [DrChrono API Docs](https://app.drchrono.com/api-docs/)

### Epic FHIR API

- **Base URL**: `https://fhir.epic.com/`
- **Authentication**: Basic Auth
- **Documentation**: [Epic FHIR Docs](https://open.epic.com/)

## Security & Compliance

- **HIPAA Compliance**: Implements healthcare data protection standards
- **Data Encryption**: Sensitive data encrypted at rest and in transit
- **Access Control**: Role-based permissions and authentication
- **Audit Logging**: Comprehensive logging of all healthcare data access
- **Secure API Communication**: HTTPS only, token-based authentication

## Responsive Design

The dashboard is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with mobile navigation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
