
# Analisi dei Problemi e Azioni Correttive

---

Questo documento analizza le criticità emerse durante il progetto "Eco-SNEAK" e descrive le azioni intraprese per gestirle.

## Problema 1: Ritardo nella Fase Creativa

- **Evento:** Il Graphic Designer ha subito un'interruzione di corrente, causando un ritardo di 1 giorno nella consegna delle bozze. Il cliente ha poi richiesto una revisione completa, aggiungendo un altro giorno di ritardo.
- **Causa Radice (Root Cause):**
  1.  **Mancanza di ridondanza:** Il team creativo si basava su una sola persona per un deliverable critico.
  2.  **Comunicazione asincrona:** La grande differenza di fuso orario (9 ore tra Italia e Brasile) ha reso il ciclo di feedback e revisione intrinsecamente lento. Un problema che richiederebbe pochi minuti in un ufficio, ha richiesto quasi 24 ore per essere risolto.
  3.  **Errata gestione delle aspettative del cliente:** Il briefing iniziale non era sufficientemente dettagliato da prevenire una revisione così sostanziale.

- **Azione Correttiva Proposta:**
  1.  **Contingency Plan:** Per progetti futuri con team distribuiti, definire un piano di emergenza. Ad esempio, avere contatti con un secondo freelancer di backup da poter attivare in caso di necessità.
  2.  **Migliorare la Comunicazione:** Stabilire "ore di sovrapposizione" obbligatorie (almeno 1-2 ore al giorno) in cui tutto il team, inclusi i membri con fusi orari estremi, deve essere online per meeting rapidi e approvazioni.
  3.  **Workshop di Allineamento:** Introdurre un workshop di allineamento creativo con il cliente *prima* dell'inizio della produzione, utilizzando moodboard e benchmark per assicurarsi che le aspettative siano chiare e condivise.

---

## Problema 2: Blocco dello Sviluppo della Landing Page

- **Evento:** Il Web Developer freelancer ha annunciato un ritardo di 3 giorni a causa di un altro progetto, bloccando l'intera timeline.
- **Causa Radice (Root Cause):**
  1.  **Single Point of Failure (SPOF):** L'attività più critica del progetto dipendeva da una singola risorsa esterna, non pienamente dedicata al progetto.
  2.  **Valutazione del Rischio Fornitore Inadeguata:** Il rischio legato alla disponibilità e priorità del freelancer non era stato valutato e mitigato a sufficienza nel Project Charter.
  3.  **Contrattualistica Debole:** Il contratto con il freelancer non prevedeva penali per i ritardi o clausole di esclusività per il periodo di sviluppo.

- **Azione Correttiva Attuata (Reattiva):**
  1.  **Task Force:** È stato immediatamente ingaggiato un secondo Web Developer (con un costo aggiuntivo di € 5.000) per lavorare in parallelo alla risorsa originale, dividendo i compiti per accelerare il completamento.
  2.  **Rinegoziazione:** È stata negoziata una piccola riduzione del compenso del primo developer per il disagio creato, anche se non contrattualmente obbligato.
  3.  **Compressione del Percorso Critico:** Il Social Media Manager ha iniziato a preparare le campagne usando un ambiente di test, in modo da essere pronto per il lancio non appena la landing page fosse stata online, riducendo così il tempo di setup.

- **Azione Correttiva Proposta (Preventiva per il futuro):**
  1.  **Selezione Fornitori Strategica:** Per le attività critiche, preferire agenzie o freelancer che possano garantire la continuità del lavoro (es. tramite un team) o stipulare contratti che includano SLA (Service Level Agreement) chiari.
  2.  **Onboarding Approfondito:** Assicurarsi che i fornitori esterni comprendano appieno l'impatto del loro lavoro sulla timeline generale del progetto e le dipendenze a valle.
  3.  **Buffer di Tempo:** Inserire nel piano di progetto dei buffer di tempo (es. 1-2 giorni) specificamente per le attività che dipendono da fornitori esterni, specialmente se nuovi.

---
