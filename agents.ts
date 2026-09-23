export type AgentId="alex"|"nora"|"leo"|"mia"|"lina"|"aria"|"eli"|"zoe"|"max"|"kai"|"iris"|"adam"|"ryan"|"luna"|"atlas";
export type AgentDefinition={id:AgentId;name:string;role:string;tools:string[]};
export const AGENTS:AgentDefinition[]=[
 ["alex","Alex","AI Director / Orchestrator",["read_customer_request","read_project","create_project_plan","create_task","create_task_dependency","assign_task","reassign_task","read_task_status","request_agent_review","request_human_approval","pause_workflow","resume_workflow","complete_workflow"]],
 ["nora","Nora","Business Analyst",["read_business_profile","read_project","read_customer_requirements","create_business_analysis","save_business_analysis","request_clarification"]],
 ["leo","Leo","Market Research",["research_market","analyze_competitors","extract_sources","save_market_research"]],
 ["mia","Mia","Strategist",["create_strategy","analyze_business_model","create_positioning","save_strategy"]],
 ["lina","Lina","UX Designer",["create_user_flows","create_information_architecture","create_ux_specification","save_ux_specification"]],
 ["aria","Aria","UI & Brand",["create_visual_direction","create_brand_system","create_ui_specification","save_design_specification"]],
 ["eli","Eli","Content",["generate_content","rewrite_content","create_content_plan","save_content"]],
 ["zoe","Zoe","Media",["generate_media_brief","generate_media_prompt","process_media","save_media_asset"]],
 ["max","Max","Frontend Developer",["read_technical_specification","create_frontend_task","modify_project_files","run_frontend_tests","run_build"]],
 ["kai","Kai","Backend Developer",["inspect_database","create_migration","inspect_api","create_api","test_endpoint"]],
 ["iris","Iris","SEO/GEO",["run_seo_audit","generate_metadata","generate_schema","inspect_sitemap","inspect_robots","analyze_content"]],
 ["adam","Adam","Social Media",["create_social_strategy","create_content_calendar","create_post","analyze_social_metrics"]],
 ["ryan","Ryan","Advertising",["create_campaign_plan","create_ad_creative","validate_tracking","prepare_campaign","analyze_campaign"]],
 ["luna","Luna","Analytics",["read_analytics","calculate_metrics","detect_anomalies","generate_insights"]],
 ["atlas","Atlas","QA & Security",["run_tests","run_security_checks","validate_permissions","validate_api","validate_build","create_qa_report"]]
].map(([id,name,role,tools])=>({id:id as AgentId,name,role,tools}));
