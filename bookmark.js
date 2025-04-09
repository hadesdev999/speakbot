javascript:(function() {
  const discordLink = "https://discord.gg/3HQ3QXs4SV";

  // Cria a tela de bloqueio inicial
  const blocker = document.createElement("div");
  blocker.id = "discordBlocker";
  blocker.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#111;z-index:99999;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;text-align:center;padding:20px;">
      <h2 style="font-size:24px;margin-bottom:10px;">Speak Turbo Bot</h2>
      <p>Para usar o bot, entre no servidor do Discord:</p>
      <a id="goDiscord" href="${discordLink}" target="_blank" style="margin:10px 0;display:inline-block;background:#5865F2;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-weight:bold;">Entrar no Discord</a>
      <button id="unlockBtn" disabled style="opacity:0.5;margin-top:15px;background:#444;color:#fff;padding:8px 16px;border:none;border-radius:8px;cursor:not-allowed;">Liberar acesso</button>
      <p style="margin-top:15px;font-size:12px;color:#999;">Feito por @humbdev</p>
    </div>
  `;
  document.body.appendChild(blocker);

  document.getElementById("goDiscord").addEventListener("click", () => {
    const btn = document.getElementById("unlockBtn");
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.style.cursor = "pointer";
    btn.innerText = "Liberar acesso";
    btn.addEventListener("click", () => {
      blocker.remove();
      startBotUI();
    });
  });

  // Inicia o menu e bot
  function startBotUI() {
    const style = document.createElement("style");
    style.innerHTML = `
    #speakBotMenu {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 220px;
      background: #222;
      color: #fff;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(0,0,0,0.4);
      z-index: 9999;
      font-family: sans-serif;
    }
    #speakBotMenu button {
      background: #444;
      color: white;
      border: none;
      margin-top: 10px;
      padding: 8px;
      width: 100%;
      cursor: pointer;
      border-radius: 8px;
    }
    #speakBotMenu button:hover {
      background: #666;
    }
    #speakBotMenu small {
      display: block;
      margin-top: 10px;
      text-align: center;
      color: #888;
      font-size: 11px;
    }
    `;
    document.head.appendChild(style);

    const menu = document.createElement("div");
    menu.id = "speakBotMenu";
    menu.innerHTML = `
      <strong>Speak Turbo Bot</strong><br><br>
      <button id="startBot">▶ Iniciar Bot</button>
      <button id="stopBot">⏹ Parar</button>
      <p id="status">Status: parado</p>
      <small>Feito por @humbdev</small>
    `;
    document.body.appendChild(menu);

    let running = false;

    document.getElementById("startBot").onclick = () => {
      running = true;
      document.getElementById("status").innerText = "Status: rodando...";
      startSolving();
    };

    document.getElementById("stopBot").onclick = () => {
      running = false;
      document.getElementById("status").innerText = "Status: parado";
    };

    async function startSolving() {
      while (running) {
        try {
          // Clica em Play se tiver vídeo/áudio
          let play = document.querySelector("button[aria-label='Play']") || document.querySelector("video");
          if (play) {
            play.click?.();
            await delay(5000);
          }

          // Preenche inputs com texto padrão
          document.querySelectorAll("input[type='text']").forEach(input => {
            if (!input.value) input.value = "I am fine";
          });

          // Clica em opções com palavras comuns
          const options = document.querySelectorAll("button");
          options.forEach(opt => {
            if (opt.innerText.match(/I|He|She|Go|Is|Monday|Usually|My name is/i)) {
              opt.click();
            }
          });

          // Clica em Next
          const next = [...document.querySelectorAll("button")].find(b => b.innerText.toLowerCase().includes("next"));
          if (next) {
            next.click();
            await delay(2500);
            continue;
          }

          // Back to lesson overview
          const back = [...document.querySelectorAll("button")].find(b => b.innerText.toLowerCase().includes("back"));
          if (back) {
            back.click();
            await delay(2500);
            continue;
          }

          // Go to current unit
          const go = [...document.querySelectorAll("button")].find(b => b.innerText.toLowerCase().includes("go to current unit"));
          if (go) {
            go.click();
            await delay(2500);
            continue;
          }

          await delay(1000);
        } catch (e) {
          console.log("Erro no bot:", e);
          await delay(3000);
        }
      }
    }

    function delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    }
  }
})();
