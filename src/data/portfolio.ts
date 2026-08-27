import type {
  SiteConfig,
  NavItem,
  Project,
  SkillCategory,
  Stat,
  ContactInfo,
} from "@/types";

export const siteConfig: SiteConfig = {
  name: "Syed Salman Ali",
  title: "Cloud Team Lead & Software Engineer",
  description:
    "Cloud Team Lead at AKSIQ, architecting multi-region AWS infrastructure for TradeIQ, a license-based fintech platform serving 22+ clients across SaaS, on-premises, and Linux deployments.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://syedsalmanali.com",
  links: {
    github: "https://github.com/iSyedSalmanAli",
    linkedin: "https://www.linkedin.com/in/isyedsalmanali",
    twitter: "#",
    email: "i.syedsalmanali@gmail.com",
  },
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const typedTitles: string[] = [
  "Cloud Team Lead",
  "AWS Solutions Architect",
  "Backend Engineer",
  "DevOps & CI/CD",
  "Data Engineering",
];

export const stats: Stat[] = [
  { value: 22, suffix: "+", label: "Clients Served" },
  { value: 7, suffix: "", label: "CI/CD Pipelines" },
  { value: 3, suffix: "", label: "AWS Regions" },
  { value: 20, suffix: "+", label: "Prod Instances" },
];

export const projects: Project[] = [
  {
    title: "TradeIQ Cloud Infrastructure",
    description:
      "Architected multi-region AWS infrastructure (Virginia, Ohio, Singapore) for a license-based fintech platform serving 22+ clients. Managed 20+ EC2 instances, 7 ECS clusters, and 9 RDS databases with isolated environments spanning SaaS, on-premises, and Linux-based deployments for 2 banking clients.",
    tags: ["AWS", "EC2", "ECS", "RDS", "Multi-Region"],
    icon: "☁️",
  },
  {
    title: "CI/CD & DevOps Pipelines",
    description:
      "Built 7 production CodePipelines covering TradeIQ API, PriceBots, Forex, Commodities, SemanticSearch, and WebOC. All maintaining 100% success rate. ECS services utilized across all 22+ licensed clients in SaaS and on-premises environments.",
    tags: ["CodePipeline", "CodeCommit", "Docker", "ECS"],
    icon: "🔄",
  },
  {
    title: "AI/ML Infrastructure",
    description:
      "Provisioned GPU compute (NVIDIA L40S, A100) for ML model training and inference. Managed Bifrost AI Gateway, SageMaker integration, and commodities training pipelines with canary fallback mechanisms.",
    tags: ["GPU", "SageMaker", "L40S", "A100", "ML"],
    icon: "🤖",
  },
  {
    title: "Data Layer & Search Platform",
    description:
      "Managed 9 RDS instances (PostgreSQL + SQL Server) across regions, OpenSearch cluster with 2+ TiB trade data, ElastiCache (Valkey) for dev/prod caching, and 22+ S3 buckets for backups, Terraform state, and CloudTrail logs.",
    tags: ["PostgreSQL", "OpenSearch", "ElastiCache", "Terraform"],
    icon: "🗄️",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Cloud & AWS",
    skills: [
      { name: "EC2 / ECS / Fargate", level: 92 },
      { name: "RDS (PostgreSQL + SQL Server)", level: 88 },
      { name: "S3 / CloudTrail / CloudWatch", level: 90 },
      { name: "OpenSearch / ElastiCache", level: 82 },
      { name: "IAM / VPC / Security Groups", level: 85 },
    ],
  },
  {
    name: "DevOps & CI/CD",
    skills: [
      { name: "CodePipeline / CodeBuild", level: 90 },
      { name: "Docker & Containers", level: 85 },
      { name: "Terraform (IaC)", level: 80 },
      { name: "Git / CodeCommit", level: 92 },
      { name: "Linux Administration", level: 82 },
    ],
  },
  {
    name: "Backend & APIs",
    skills: [
      { name: "Python (Django / Flask / FastAPI)", level: 90 },
      { name: "API Design & Integration", level: 88 },
      { name: "PostgreSQL / SQL Server", level: 85 },
      { name: "Unit Testing & Code Reviews", level: 80 },
    ],
  },
  {
    name: "ML & Data",
    skills: [
      { name: "GPU Infra (L40S / A100 / SageMaker)", level: 78 },
      { name: "TensorFlow / PyTorch", level: 76 },
      { name: "ETL Pipelines (Airflow / Dagster)", level: 80 },
      { name: "Pandas / Data Visualization", level: 82 },
    ],
  },
];

export const contactInfo: ContactInfo[] = [
  { icon: "📧", label: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
  { icon: "📍", label: "Karachi, Pakistan" },
  { icon: "💼", label: "LinkedIn", href: siteConfig.links.linkedin },
  { icon: "🐙", label: "GitHub", href: siteConfig.links.github },
];
