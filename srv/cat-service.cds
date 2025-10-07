using com.scb.intellibase as intel from '../db/schema';

service CatalogService {
    entity Prompts            as projection on intel.PromptsData;
}