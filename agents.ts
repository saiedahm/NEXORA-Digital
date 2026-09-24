export type AgentId = "alex" | "nora" | "leo" | "mia" | "lina" | "aria" | "eli" | "zoe" | "max" | "kai" | "iris" | "adam" | "ryan" | "luna" | "atlas";

export type AgentDefinition = {
  id: AgentId;
  name: string;
  role: string;
  tools: string[];
};

export const AGENTS: AgentDefinition[] = [
  {
    id: "alex",
    name: "Alex",
    role: "AI Director / Orchestrator",
    tools: ["read_customer_request", "read_project", "create_project_plan", "create_task", "create_task_dependency", "assign_task", "reassign_task", "read_task_status", "request_agent_review", "request_human_approval", "pause_workflow", "resume_workflow", "complete_workflow"],
  },
  {
    id: "nora",
    name: "Nora",
    role: "Business Analyst",
    tools: ["read_business_profile", "read_project", "read_customer_requirements", "create_business_analysis", "save_business_analysis", "request_clarification"],
  },
  {
    id: "leo",
    name: "Leo",
    role: "Market Research",
    tools: ["research_market", "analyze_competitors", "extract_sources", "save_market_research"],
  },
  {
    id: "mia",
    name: "Mia",
    role: "Strategist",
    tools: ["create_strategy", "analyze_business_model", "create_positioning", "save_strategy"],
  },
  {
    id: "lina",
    name: "Lina",
    role: "UX Designer",
    tools: ["create_user_flows", "create_information_architecture", "create_ux_specification", "save_ux_specification"],
  },
  {
    id: "aria",
    name: "Aria",
    role: "UI & Brand",
    tools: ["create_visual_direction", "create_brand_system", "create_ui_specification", "save_design_specification"],
  },
  {
    id: "eli",
    name: "Eli",
    role: "Content",
    tools: ["generate_content", "rewrite_content", "create_content_plan", "save_content"],
  },
  {
    id: "zoe",
    name: "Zoe",
    role: "Media",
    tools: ["generate_media_brief", "generate_media_prompt", "process_media", "save_media_asset"],
  },
  {
    id: "max",
    name: "Max",
    role: "Frontend Developer",
    tools: ["read_technical_specification", "create_frontend_task", "modify_project_files", "run_frontend_tests", "run_build"],
  },
  {
    id: "kai",
    name: "Kai",
    role: "Backend Developer",
    tools: ["inspect_database", "create_migration", "inspect_api", "create_api", "test_endpoint"],
  },
  {
    id: "iris",
    name: "Iris",
    role: "SEO/GEO",
    tools: ["run_seo_audit", "generate_metadata", "generate_schema", "inspect_sitemap", "inspect_robots", "analyze_content"],
  },
  {
    id: "adam",
    name: "Adam",
    role: "Social Media",
    tools: ["create_social_strategy", "create_content_calendar", "create_post", "analyze_social_metrics"],
  },
  {
    id: "ryan",
    name: "Ryan",
    role: "Advertising",
    tools: ["create_campaign_plan", "create_ad_creative", "validate_tracking", "prepare_campaign", "analyze_campaign"],
  },
  {
    id: "luna",
    name: "Luna",
    role: "Analytics",
    tools: ["read_analytics", "calculate_metrics", "detect_anomalies", "generate_insights"],
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "QA & Security",
    tools: ["run_tests", "run_security_checks", "validate_permissions", "validate_api", "validate_build", "create_qa_report"],
  },
];
