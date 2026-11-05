import type { ReactNode } from "react";
import { Countdown } from "@/components/Countdown";
import { DepthGauge } from "@/components/DepthGauge";
import { IceMap } from "@/components/IceMap";
import { IcebergDeep, IcebergTip } from "@/components/Iceberg";
import { SignupForm } from "@/components/SignupForm";
import { Wave } from "@/components/Wave";

const WRAP = "relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-10";

function Depth({ m }: { m: number }) {
  return (
    <p className="mb-6 flex items-center gap-4 font-mono text-sm font-semibold tracking-[0.2em] text-signal">
      <span className="bg-deep px-2 py-1 tabular-nums">−{m} м</span>
      <span className="h-0.5 w-16 bg-signal" aria-hidden="true" />
    </p>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.86] font-extrabold text-balance text-ice uppercase">
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mt-8 max-w-xl space-y-4 text-base leading-relaxed text-mist sm:text-lg ${className}`}>{children}</div>;
}

export default function Home() {
  return (
    <>
      <DepthGauge />

      {/* 1. Над водой */}
      <header className="on-ice relative flex min-h-[min(100svh,1100px)] flex-col overflow-hidden bg-ice pb-[min(470px,54vw)] text-deep">
        <div className={`${WRAP} pt-5 sm:pt-7`}>
          <p className="font-display text-3xl leading-none font-extrabold tracking-wide sm:text-4xl">АЛЛЕЯ</p>
          <p className="mt-1 text-xs tracking-[0.15em] text-slate uppercase sm:text-sm">Вода из айсбергов Ньюфаундленда</p>
        </div>

        <div className={`${WRAP} my-auto pt-14 pb-10`}>
          <h1 className="font-display text-[clamp(6rem,30vw,11rem)] leading-[0.8] font-extrabold uppercase sm:text-[clamp(7rem,16.5vw,19rem)]">
            Сезон <span className="block sm:inline">закрыт</span>
          </h1>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Лёд прошлой весны разобран до последней бутылки. Новые айсберги уже отходят от Гренландии и медленно
              идут на юг. До начала сезона 25&nbsp;апреля — <Countdown />.
            </p>
            <a
              href="#signup"
              className="inline-flex h-14 items-center justify-center self-start border-2 border-deep bg-signal px-7 font-semibold text-deep transition-colors hover:bg-deep hover:text-ice lg:self-auto"
            >
              Записаться на следующий лёд ↓
            </a>
          </div>
        </div>

        <IcebergTip className="absolute bottom-0 left-1/2 -translate-x-1/2" />
      </header>

      {/* Под водой */}
      <main className="relative overflow-x-clip bg-deep">
        <Wave />

        <div className="relative">
          <IcebergDeep className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2" />
          <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

          {/* 2. Линия воды */}
          <section data-depth="0" className={`${WRAP} pt-14 pb-[clamp(140px,26vh,300px)]`}>
            <p className="max-w-md font-mono text-base text-ice sm:text-lg">
              <span className="font-semibold text-signal">0 м.</span> Дальше то, чего с палубы не видно.
            </p>
          </section>

          {/* 3. −30 м */}
          <section data-depth="30" className={`${WRAP} pb-[clamp(180px,34vh,380px)]`} aria-labelledby="s-age">
            <Depth m={30} />
            <div id="s-age">
              <H2>Этот лёд старше письменности</H2>
            </div>
            <Body>
              <p>
                Льду около <span className="text-ice">10&nbsp;000 лет</span>. Он лежал снегом на ледниках Гренландии
                задолго до того, как люди научились писать.
              </p>
              <p>
                Каждую весну от ледников откалываются сотни айсбергов. Течение несёт их на юг — в Айсберговую аллею,
                полосу океана между Лабрадором и Ньюфаундлендом.
              </p>
            </Body>
          </section>

          {/* 4. −80 м */}
          <section data-depth="80" className={`${WRAP} pb-[clamp(180px,34vh,380px)]`}>
            <div className="lg:ml-auto lg:max-w-[52rem]">
              <Depth m={80} />
              <H2>За ним выходят в море</H2>
              <Body>
                <p>
                  Сезон короткий: с конца апреля до начала июня. К айсбергу подходят на небольших лодках и собирают
                  отколовшиеся куски.
                </p>
                <p>Работа опасная. Лёд не предупреждает, когда решит сдвинуться.</p>
              </Body>
              <dl className="mt-12 grid gap-8 sm:grid-cols-3">
                {[
                  ["Апр — июн", "сезон: с конца апреля до начала июня"],
                  ["1 млн т", "может весить глыба — и перевернуться, утянув лодку"],
                  ["5 частей", "на столько айсберг способен расколоться за одну ночь"],
                ].map(([big, small]) => (
                  <div key={big} className="border-t border-mist/50 pt-4">
                    <dt className="font-display text-6xl leading-none font-extrabold text-ice">{big}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-mist">{small}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* 5. −140 м */}
          <section data-depth="140" className={`${WRAP} pb-[clamp(180px,34vh,380px)]`}>
            <Depth m={140} />
            <H2>Где он сейчас</H2>
            <div className="mt-10 max-w-4xl">
              <IceMap />
            </div>
          </section>

          {/* 6. −210 м */}
          <section data-depth="210" className={`${WRAP} pb-[clamp(160px,30vh,340px)]`}>
            <Depth m={210} />
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div className="-rotate-[1.5deg] bg-signal p-7 text-deep sm:p-10">
                <p className="font-mono text-sm font-semibold tracking-[0.25em] uppercase">Внимание</p>
                <h2 className="mt-3 font-display text-[clamp(4rem,14vw,9rem)] leading-[0.82] font-extrabold uppercase">
                  Разыски&shy;вается
                </h2>
                <p className="mt-6 font-display text-4xl leading-[0.95] font-extrabold uppercase sm:text-5xl">
                  30&nbsp;000 литров воды из&nbsp;айсбергов
                </p>
                <p className="mt-6 border-t-2 border-deep pt-4 font-mono text-base font-medium">
                  Приметы: прозрачная, без запаха.
                </p>
              </div>
              <div className="max-w-lg space-y-4 text-base leading-relaxed text-mist sm:text-lg">
                <p className="font-display text-4xl leading-none font-extrabold text-ice uppercase">Это не шутка</p>
                <p>
                  В феврале 2019 года на Ньюфаундленде за одни выходные слили резервуар со склада производителя водки.
                  Пропали те самые 30&nbsp;000 литров воды из айсбергов.
                </p>
                <p>
                  Ущерб оценили в <span className="text-ice">9–12 тысяч канадских долларов</span>.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* 7. Дно */}
        <section id="signup" data-depth="240" className={`${WRAP} scroll-mt-24 pt-[clamp(120px,18vh,220px)] pb-24`}>
          <Depth m={240} />
          <H2>Первая бутылка следующего сезона</H2>
          <Body className="mb-10">
            <p>Оставьте почту — напишем, когда лёд дойдёт до берега и первая партия будет готова.</p>
          </Body>
          <SignupForm />
        </section>

        {/* морское дно */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative z-10 block h-20 w-full sm:h-28" aria-hidden="true">
          <polygon
            points="0,120 0,70 90,52 160,78 260,40 330,66 430,58 520,84 610,46 700,72 790,60 880,88 980,50 1060,74 1150,56 1250,82 1340,48 1440,68 1440,120"
            fill="#041a22"
          />
        </svg>
        <footer className="relative z-10 bg-[#041a22] pb-12">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 text-sm leading-relaxed text-mist sm:px-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md">
              <span className="font-display text-2xl font-extrabold tracking-wide text-ice">АЛЛЕЯ</span>
              <br />
              Концепт для портфолио: бренд вымышленный, история настоящая.
            </p>
            <ul className="space-y-2">
              <li>
                <a className="text-ice underline underline-offset-4 hover:text-signal" href="https://bbc.in/2DJLwy1" target="_blank" rel="noopener noreferrer">
                  BBC: кража воды из айсбергов, 2019 ↗
                </a>
              </li>
              <li>
                <a
                  className="text-ice underline underline-offset-4 hover:text-signal"
                  href="https://www.diffordsguide.com/encyclopedia/1134/bws/harvesting-icebergs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Difford&apos;s Guide: как собирают айсберги ↗
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
    </>
  );
}
