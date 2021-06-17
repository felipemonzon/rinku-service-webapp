import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    static basePath = 'http://localhost:8085';

    static versionPath = `${AppConfig.basePath}/api/public/v1`;

    static deliveryDomain = "/deliveries";
    static employeeDomain = "/employees";

    static deliverySearchResource = `${AppConfig.deliveryDomain}/data`;
    static deliveryRetrieveResource = `${AppConfig.deliveryDomain}/data/`;
    static deliverySaveResource = `${AppConfig.deliveryDomain}/data/`;

    static deliveryRetrieve = `${AppConfig.versionPath}${AppConfig.deliveryRetrieveResource}`;
    static deliveryResource = `${AppConfig.versionPath}${AppConfig.deliverySearchResource}`;
    static deliverySave = `${AppConfig.versionPath}${AppConfig.deliverySaveResource}`;

    static employeeRetrieveResource = `${AppConfig.employeeDomain}/data/`;
    static employeeSearchResource = `${AppConfig.employeeDomain}/data`;
    static employeeResource = `${AppConfig.versionPath}${AppConfig.employeeRetrieveResource}`;

    static roleDomain = "/roles";
    static rolRetrieveResource = `${AppConfig.roleDomain}/data/`; 
    static rolResource = `${AppConfig.versionPath}${AppConfig.rolRetrieveResource}`;
}
