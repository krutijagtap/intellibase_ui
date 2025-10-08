using com.scb.intellibase as intel from '../db/schema';

service CatalogService {
    entity PromptsData            as projection on intel.PromptsData;
    action DistinctCategories() returns array of {
     category : String;
    };
    action DistinctProducts() returns array of {
        product : String;
    };
    
}