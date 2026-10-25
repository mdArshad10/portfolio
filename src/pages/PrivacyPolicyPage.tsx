import { useEffect, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { personalInfo } from "@/data/portfolio"

const lastUpdated = "October 25, 2026"

// Add the names of the games/apps published on Google Play here.
// Leave the list empty to cover every app published under the developer account.
const publishedApps: string[] = []

const sections = [
  { id: "about", title: "About this policy" },
  { id: "apps-covered", title: "Apps covered" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-information", title: "How we use information" },
  { id: "third-party-services", title: "Third-party services" },
  { id: "how-we-share-information", title: "How we share information" },
  { id: "data-retention", title: "Data retention" },
  { id: "security", title: "Security" },
  { id: "childrens-privacy", title: "Children’s privacy" },
  { id: "your-rights", title: "Your rights and choices" },
  { id: "deleting-your-data", title: "Deleting your data" },
  { id: "international-transfers", title: "International transfers" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
]

export function PrivacyPolicyPage() {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute("content") ?? null

    document.title = "Privacy Policy — Md. Arshad"
    description?.setAttribute(
      "content",
      "Privacy Policy for the mobile games and applications published on Google Play by Md. Arshad."
    )

    return () => {
      document.title = previousTitle
      if (description && previousDescription !== null) {
        description.setAttribute("content", previousDescription)
      }
    }
  }, [])

  return (
    <main id="main-content">
      <section className="border-b border-border pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="site-shell">
          <Link
            to="/"
            className="group mb-12 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="section-kicker mb-4">Legal · Google Play</p>
              <h1 className="mb-6 max-w-[14ch] text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                Privacy Policy
              </h1>
              <p className="body-copy">
                How {personalInfo.name} handles information in the mobile games and
                applications published on Google Play.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5 text-sm lg:grid-cols-1">
              <div>
                <dt className="mb-1 text-muted-foreground">Last updated</dt>
                <dd className="font-medium">{lastUpdated}</dd>
              </div>
              <div>
                <dt className="mb-1 text-muted-foreground">Data controller</dt>
                <dd className="font-medium">{personalInfo.name}</dd>
              </div>
              <div>
                <dt className="mb-1 text-muted-foreground">Platform</dt>
                <dd className="font-medium">Google Play</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="site-shell grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block lg:self-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
                On this page
              </p>
              <nav aria-label="Privacy policy sections">
                <ol className="border-l border-border">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-8 rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-semibold">Questions or requests?</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Email us and we will respond as soon as possible.
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mt-3 inline-block break-all text-sm font-semibold text-primary"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-10 rounded-xl border border-border bg-card p-6 sm:p-7">
              <p className="mb-2 text-sm font-semibold">The short version</p>
              <p className="max-w-[68ch] leading-7 text-muted-foreground">
                We do not sell your personal information. We collect only what is
                needed to run the Apps, keep them stable, and respond to you. Where
                an App shows ads or offers purchases, the relevant Google Play and
                advertising services described below may process data as well.
              </p>
            </div>

            <PolicySection id="about" number="01" title="About this policy">
              <p>
                This Privacy Policy explains how {personalInfo.name} (“we”, “us”,
                “our”) collects, uses, and protects information in connection with
                the mobile games and applications we publish on Google Play (each,
                an “App”). It applies to the App itself, its store listing, and any
                support interaction you have with us.
              </p>
              <p>
                By downloading, installing, or using an App, you acknowledge this
                policy. If you do not agree with it, please do not use the App. If
                an App has its own separate privacy policy, that policy applies
                alongside or instead of this one.
              </p>
            </PolicySection>

            <PolicySection id="apps-covered" number="02" title="Apps covered">
              <p>
                This policy applies to all mobile games and applications published
                by {personalInfo.name} on Google Play, including current and future
                titles under the same developer account.
              </p>
              {publishedApps.length > 0 ? (
                <ul>
                  {publishedApps.map((app) => (
                    <li key={app}>{app}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  The specific App you installed is identified on its Google Play
                  store listing. App-specific data practices are also summarised in
                  the “Data safety” section of that listing.
                </p>
              )}
            </PolicySection>

            <PolicySection
              id="information-we-collect"
              number="03"
              title="Information we collect"
            >
              <p>
                We aim to collect as little information as possible. Depending on
                the App and the features you use, we may collect the following
                categories of information.
              </p>

              <h3>Information you provide</h3>
              <p>
                If you contact us for support, we receive your name, email address,
                and the content of your message. If an App offers an account or
                sign-in feature, we may receive the profile details needed to
                create and secure that account.
              </p>

              <h3>Gameplay and usage information</h3>
              <p>
                We may collect game progress, scores, levels completed, in-game
                settings, session length, and interactions with App features. This
                helps us save your progress, fix problems, and improve the
                experience.
              </p>

              <h3>Device and technical information</h3>
              <p>
                We may receive your device model, operating system version,
                language, app version, general region derived from your IP address,
                crash logs, and diagnostic or performance data. We do not use this
                information to identify you personally unless the App explicitly
                offers an account feature.
              </p>

              <h3>Purchase information</h3>
              <p>
                If an App offers in-app purchases or subscriptions, Google Play
                processes the payment. We may receive confirmation that a purchase
                occurred and the product purchased, but we do not receive or store
                your full payment card details.
              </p>

              <h3>Advertising information</h3>
              <p>
                If an App displays advertisements, Google AdMob or another
                advertising partner may collect device identifiers, approximate
                location, and usage information to deliver and measure ads. You can
                limit personalised advertising in your device settings.
              </p>

              <h3>Sensitive information</h3>
              <p>
                We do not collect your contacts, SMS or call logs, photos, or
                precise GPS location unless an App feature requires it. Camera,
                microphone, location, or other sensitive permissions are requested
                only when a feature needs them, and only after you grant permission.
                You can revoke a permission at any time in your device settings.
              </p>
            </PolicySection>

            <PolicySection
              id="how-we-use-information"
              number="04"
              title="How we use information"
            >
              <p>We use the information described above to:</p>
              <ul>
                <li>Provide, operate, and maintain the Apps.</li>
                <li>Save progress, remember settings, and personalise gameplay.</li>
                <li>Process and verify purchases made through Google Play.</li>
                <li>Respond to support requests and other messages.</li>
                <li>Understand how the Apps are used and improve their features.</li>
                <li>Detect, prevent, and fix crashes, abuse, and security issues.</li>
                <li>Display and measure advertisements where an App includes them.</li>
                <li>Comply with applicable legal obligations and enforce our terms.</li>
              </ul>
              <p>
                Where required by law, we rely on your consent, the performance of a
                contract with you, or our legitimate interests in operating and
                improving the Apps.
              </p>
            </PolicySection>

            <PolicySection
              id="third-party-services"
              number="05"
              title="Third-party services"
            >
              <p>
                Depending on the App, it may use services provided by Google or other
                trusted providers. These services process information under their own
                privacy policies. Common examples include:
              </p>
              <ul>
                <li>
                  <ExternalLink href="https://policies.google.com/privacy">
                    Google Privacy Policy
                  </ExternalLink>{" "}
                  — for Google Play services and related processing.
                </li>
                <li>
                  <ExternalLink href="https://play.google.com/about/play-terms/">
                    Google Play Terms of Service
                  </ExternalLink>{" "}
                  — for downloads, payments, and store services.
                </li>
                <li>
                  <ExternalLink href="https://firebase.google.com/support/privacy">
                    Firebase Privacy Information
                  </ExternalLink>{" "}
                  — for analytics, crash reporting, and remote configuration where
                  used.
                </li>
                <li>
                  <ExternalLink href="https://support.google.com/admob/answer/6128543">
                    Google AdMob Privacy Information
                  </ExternalLink>{" "}
                  — for advertising where an App displays ads.
                </li>
              </ul>
              <p>
                We encourage you to review those policies. We are not responsible
                for the independent privacy practices of third-party providers.
              </p>
            </PolicySection>

            <PolicySection
              id="how-we-share-information"
              number="06"
              title="How we share information"
            >
              <p>
                We do not sell your personal information. We may share information
                only in the following limited circumstances:
              </p>
              <ul>
                <li>
                  With service providers that help us operate the Apps, such as
                  hosting, analytics, crash reporting, and advertising partners.
                </li>
                <li>
                  With Google Play to process downloads, purchases, and platform
                  services.
                </li>
                <li>
                  When required by law, regulation, legal process, or a valid
                  government request.
                </li>
                <li>
                  To protect the rights, safety, and security of our users, the
                  Apps, or us.
                </li>
                <li>
                  In connection with a merger, acquisition, or sale of assets,
                  subject to this policy.
                </li>
                <li>With your consent or at your direction.</li>
              </ul>
            </PolicySection>

            <PolicySection id="data-retention" number="07" title="Data retention">
              <p>
                We retain information only for as long as it is needed for the
                purposes described in this policy, including to provide the Apps,
                resolve disputes, and meet legal obligations. When information is no
                longer needed, we delete it or anonymise it. Support messages may be
                kept for a reasonable period so we can follow up on your request.
                Aggregated or anonymised data that cannot identify you may be kept
                for longer.
              </p>
            </PolicySection>

            <PolicySection id="security" number="08" title="Security">
              <p>
                We use reasonable technical and organisational measures to protect
                information against unauthorised access, loss, or misuse. However, no
                method of transmission or storage is completely secure, and we cannot
                guarantee absolute security. Please use the Apps and share information
                with us responsibly.
              </p>
            </PolicySection>

            <PolicySection
              id="childrens-privacy"
              number="09"
              title="Children’s privacy"
            >
              <p>
                Our Apps are not directed to children under 13 unless the relevant
                Google Play listing says otherwise. We do not knowingly collect
                personal information from children in violation of applicable law. If
                an App is listed as child-directed or participates in Google Play
                Families, we comply with the Google Play Families Policy and the
                children’s privacy laws that apply in your region.
              </p>
              <p>
                If you believe a child has provided personal information to us,
                please contact us at {personalInfo.email} and we will take reasonable
                steps to delete it.
              </p>
            </PolicySection>

            <PolicySection id="your-rights" number="10" title="Your rights and choices">
              <p>
                Depending on where you live, you may have the right to access,
                correct, delete, or receive a copy of your personal information, to
                object to or restrict certain processing, or to withdraw consent. You
                may also have the right to lodge a complaint with your local data
                protection authority.
              </p>
              <p>
                You can control personalised advertising through your device settings
                by resetting or deleting your advertising ID and opting out of ad
                personalisation. You can also stop all data collection by uninstalling
                the App.
              </p>
              <p>
                To exercise a privacy right, email us at {personalInfo.email}. We may
                need to verify your request before acting on it and will respond
                within the timeframe required by applicable law.
              </p>
            </PolicySection>

            <PolicySection
              id="deleting-your-data"
              number="11"
              title="Deleting your data"
            >
              <p>
                You can request deletion of personal information associated with an
                App by emailing {personalInfo.email} with the subject line “Data
                deletion request”. Please include the App name and enough information
                for us to locate the relevant data. We will delete the data unless we
                are required to retain it for legal, security, or fraud-prevention
                reasons, and we will explain if that is the case.
              </p>
              <p>
                Some data may be stored locally on your device. Uninstalling the App
                or clearing its data through your device settings will remove that
                local data.
              </p>
            </PolicySection>

            <PolicySection
              id="international-transfers"
              number="12"
              title="International transfers"
            >
              <p>
                Information may be processed in countries other than the one where
                you live, including by Google and other service providers. Where we
                transfer personal information across borders, we take reasonable steps
                to ensure it receives an appropriate level of protection as required
                by applicable law.
              </p>
            </PolicySection>

            <PolicySection id="changes" number="13" title="Changes to this policy">
              <p>
                We may update this policy from time to time to reflect changes in the
                Apps, our practices, or the law. The “Last updated” date at the top of
                this page shows when the current version took effect. If we make a
                material change, we will provide notice through the relevant Google
                Play listing or within the App where appropriate.
              </p>
            </PolicySection>

            <PolicySection id="contact" number="14" title="Contact us">
              <p>
                If you have questions about this policy, the Apps, or your personal
                information, contact the data controller:
              </p>
              <div className="mt-5 rounded-lg border border-border bg-card p-5">
                <p className="font-semibold">{personalInfo.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {personalInfo.location}
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mt-3 inline-block break-all text-sm font-semibold text-primary"
                >
                  {personalInfo.email}
                </a>
              </div>
            </PolicySection>
          </div>
        </div>
      </section>
    </main>
  )
}

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="border-t border-border py-10 first:border-t-0 first:pt-0 last:pb-0"
    >
      <div className="grid gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-6">
        <span className="text-sm text-muted-foreground">{number}</span>
        <div>
          <h2 className="mb-4 text-2xl font-semibold tracking-[-0.035em]">
            {title}
          </h2>
          <div className="policy-copy space-y-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  )
}
