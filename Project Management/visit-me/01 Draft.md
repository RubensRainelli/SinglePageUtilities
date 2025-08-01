# Concept di Prodotto: "Vicini a Te"

## 1. Analisi del Problema e dei Bisogni

L'obiettivo è superare le barriere che impediscono a persone anziane, sole e non tecnologiche di ricevere aiuto e compagnia in modo costante e affidabile.

**A. Utente Primario: L'Anziano**
*   **Contesto:** Vive solo/a, indipendente ma vulnerabile. Non usa tecnologia complessa.
*   **Bisogni:** Sicurezza passiva, compagnia, mantenimento dell'indipendenza, fiducia nei visitatori.

**B. Utente Secondario: Il Familiare**
*   **Contesto:** Impegnato e preoccupato per il benessere del proprio caro.
*   **Bisogni:** Pace della mente, organizzazione semplice delle visite, comunicazioni chiare e tempestive, controllo e affidabilità del sistema.

**C. Utente Terziario: Il Volontario/Visitatore**
*   **Contesto:** Membro della community che desidera offrire il proprio tempo.
*   **Bisogni:** Flessibilità, chiarezza nelle istruzioni, protocolli di sicurezza, percezione dell'impatto del proprio aiuto.

## 2. La Soluzione Chiave: Il Check-in "No-Tech"

Il sistema si basa su un oggetto fisico e non tecnologico per l'anziano: un **QR Code** (stampato su un magnete, un pannello o un portachiavi) posizionato vicino alla porta d'ingresso.

**Flusso Operativo:**
1.  **Check-in:** Il volontario arriva e scansiona il QR Code con la WebApp. Il familiare viene notificato.
2.  **Check-out:** Al termine della visita, il volontario scansiona nuovamente il QR Code.
3.  **Report Rapido:** L'app richiede al volontario un feedback immediato: "Tutto bene" / "Ho notato qualcosa" / "EMERGENZA", con la possibilità di aggiungere una nota testuale.
4.  **Notifica:** Il familiare riceve il report di fine visita.

## 3. Funzionalità Chiave della WebApp

### Per il Familiare ("Area Familiari")
1.  **Profilo dell'Assistito:** Scheda con indirizzo, contatti, note mediche e personali.
2.  **Calendario Visite:** Dashboard per visualizzare e richiedere visite.
3.  **Gestione Volontari:** Accesso ai profili dei volontari e possibilità di approvarli.
4.  **Notifiche in Tempo Reale:** Alert per check-in/out, report e emergenze.
5.  **Cronologia e Report:** Storico delle attività.

### Per il Volontario ("Area Volontari")
1.  **Profilo Verificato:** Registrazione con processo di verifica.
2.  **Bacheca Richieste:** Mappa/lista delle richieste di visita nella zona.
3.  **Agenda Personale:** Calendario delle visite accettate.
4.  **Scanner QR Code:** Funzione integrata per check-in/out.
5.  **Pulsante Emergenza:** Per lanciare un'allerta immediata.

## 4. Processi di Sicurezza e Affidabilità

1.  **Verifica Volontari:** Il processo di "vetting" include:
    *   Verifica dell'identità tramite un servizio di **KYC (Know Your Customer)** online.
    *   Richiesta di un **certificato del casellario giudiziale** pulito.

2.  **Protocollo di Emergenza:** Alla pressione del pulsante "EMERGENZA":
    *   Una **notifica immediata** viene inviata a tutti i contatti di emergenza del familiare.
    *   Sullo smartphone del volontario appare un **popup con l'indirizzo** dell'assistito (replicato anche in una notifica push).
    *   Viene richiesto di avviare una **chiamata al 112** direttamente dal telefono del visitatore.

3.  **Gestione Visite a Vuoto e Ritardi (Punteggio di Affidabilità):**
    *   Un **Punteggio di Affidabilità** per ogni volontario cala in caso di ritardi o mancate visite.
    *   Sotto una certa soglia, appare un badge negativo (es. "Non puntuale").
    *   In caso di ritardo per una visita programmata, una notifica automatica chiede al volontario di confermare se si sta recando sul posto.
    *   Se non c'è risposta entro X minuti, la richiesta viene inoltrata ad altri volontari approvati.
    *   In caso di nessuna disponibilità, il familiare viene allertato della situazione.

## 5. Gamification e Incentivi per i Volontari

Per mantenere alta la motivazione e la partecipazione della community:
*   **Classifica Pubblica:** Basata sui feedback ricevuti e sul Punteggio di Affidabilità.
*   **Achievement e Badge:** Assegnazione di riconoscimenti per il raggiungimento di traguardi specifici (es: "Prima visita effettuata", "10 persone diverse aiutate", "Eroe locale", "Sempre puntuale").

## 6. Modello di Business: Freemium

Il servizio offre un piano gratuito completo e un abbonamento Premium per i familiari che desiderano funzionalità avanzate.

### Funzionalità Gratuite (Base)
*   Gestione del profilo da parte di un singolo familiare.
*   Richiesta di visite a tutti i volontari disponibili.
*   Notifiche standard e di emergenza.
*   Accesso allo storico delle visite degli ultimi 30 giorni.

### Funzionalità Premium
1.  **Gestione Familiare Allargata:** Invita fino a 5 membri della famiglia a collaborare nella gestione del profilo, con accesso condiviso a calendari e notifiche.
2.  **Circolo di Fiducia:** Crea una lista di volontari preferiti a cui inviare le richieste di visita in via prioritaria.
3.  **Priorità nelle Richieste:** Metti in evidenza le tue richieste di visita nella bacheca dei volontari per aumentare la visibilità.
4.  **Reportistica Avanzata:** Accedi allo storico illimitato delle visite e ricevi report settimanali via email con insight sul benessere dell'assistito.
