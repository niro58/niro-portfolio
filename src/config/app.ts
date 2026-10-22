import { createCloudflareImageUrl } from "$lib/utils/common";


export class AppConfig {
    static publicImageCdn = "https://imagedelivery.net/7WKcVsmsOjoGLZ6M5TFPXA/"
    // Contact form: the platform's public path. The token is public by design.
    static PUBLIC_CONTACT_FORM_URL = "https://cms.sitely.cz/public/contact/niro-portfolio-web"
    static PUBLIC_CONTACT_FORM_TOKEN = "pcf_HIQIVH35M3UYHLN5XELPRN26GU"
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
