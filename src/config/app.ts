import { env } from "$env/dynamic/public";
import { createCloudflareImageUrl } from "$lib/utils/common";


export class AppConfig {
    static defaultBlogLimit = 6;
    static defaultPortfolioLimit = 4;

    static maxImageSize = 40 * 1024 * 1024
    static maxImageEditAmount = 100
    static maxVideoSize = 10000 * 1024 * 1024
    static maxVideoEditAmount = 10;

    static contact = {
        email: "niro.dev.01@gmail.com"
    }

    static socialLinks = {
        github: 'https://github.com/niro58',
        linkedin: 'https://www.linkedin.com/in/nichita-roilean-2b4673241/',
        discord: 'https://discord.gg/rurbfUdcHd'
    }
    static logoUrl = "https://www.nichita-r.cz/logo.png"
    static siteUrl = "https://www.nichita-r.cz"
    static siteName = "Niro | Personal Page"
    static rssName = "Niro News"
    static rssDescription = "A portfolio and news feed from Niro"
    static baseUrl = env.PUBLIC_BASE_URL;

    static jsonLdWebsiteId = "website"

    static jsonLdWebsiteLogo = createCloudflareImageUrl("33a9f1db-82d0-4fd9-7a43-614e5ae60900", {
        width: "256",
        height: "256",
        fit: "cover"
    })
    static jsonLdWebsiteImage = createCloudflareImageUrl("33a9f1db-82d0-4fd9-7a43-614e5ae60900", {
        width: "1024",
        height: "776",
        fit: "cover"
    })
    static firstDefaultImage = createCloudflareImageUrl("33a9f1db-82d0-4fd9-7a43-614e5ae60900", {
        width: "1200",
        height: "630",
        fit: "cover"
    })
    static themeColor = "#FF4645";
}
