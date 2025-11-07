import { createCloudflareImageUrl } from "$lib/utils/common";


export class AppConfig {
    static publicImageCdn = "https://imagedelivery.net/7WKcVsmsOjoGLZ6M5TFPXA/"
    static publicContactApi = "https://api.nichita-r.com"
    static baseUrl = "https://www.nichita-r.com"
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
        githubUsername: "niro58",
        discordUsername: "niro58",
        linkedin: 'https://www.linkedin.com/in/nichita-roilean-2b4673241/',
        discord: 'https://discord.gg/rurbfUdcHd'
    }
    static logoUrl = "https://www.nichita-r.com/logo.png"
    static siteUrl = "https://www.nichita-r.com"
    static siteName = "Niro | Personal Page"
    static rssName = "Niro News"
    static rssDescription = "A portfolio and news feed from Niro"

    static jsonLdWebsiteId = "website"


    static themeColor = "#FF4645";
}
