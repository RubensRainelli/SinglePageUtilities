# Piano di Progetto e Gantt: Tastiera "Memento Mori"

## 1. Work Breakdown Structure (WBS)

1.  **Project Management**
    1.1. Pianificazione e Setup
    1.2. Monitoraggio e Controllo
    1.3. Gestione Rischi
    1.4. Chiusura Progetto

2.  **Ricerca e Sviluppo (R&S)**
    2.1. Ricerca Materiale Tasti
    2.2. Progettazione Meccanismo di Degradazione
    2.3. Progettazione Elettronica (PCB)
    2.4. Design Industriale (Case)

3.  **Prototipazione**
    3.1. Approvvigionamento Componenti Prototipo
    3.2. Assemblaggio Prototipi (x3)
    3.3. Test Funzionali e di Durabilità
    3.4. Iterazione e Correzione Difetti

4.  **Produzione**
    4.1. Selezione e Contrattualizzazione Produttore
    4.2. Setup Linea di Produzione
    4.3. Approvvigionamento Materiali per Lotto 1
    4.4. Produzione Lotto 1

5.  **Marketing e Campagna Kickstarter**
    5.1. Sviluppo Strategia di Marketing
    5.2. Creazione Contenuti (Video, Foto, Testi)
    5.3. Sviluppo Pagina Kickstarter
    5.4. Lancio e Gestione Campagna
    5.5. Comunicazione con i Backers

## 2. Diagramma di Gantt (Simulazione)

*Nota: Le date includono buffer per i ritardi noti e potenziali.*

| ID | Attività | Inizio Previsto | Fine Prevista | Durata (gg) | Dipendenze | Note e Potenziali Ritardi |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Project Management** | 2025-07-11 | 2026-03-31 | Continuo | - | - |
| **2** | **Ricerca e Sviluppo** | 2025-07-15 | 2025-09-19 | 45 | 1.1 | - |
| 2.1 | Ricerca Materiale Tasti | 2025-07-15 | 2025-08-08 | 20 | 1.1 | **RITARDO LOGISTICO (1 SETT):** Il fornitore del polimero ha ritardato l'invio dei campioni. Nuova fine: 2025-08-15 |
| 2.2 | Progettazione Meccanismo | 2025-08-18 | 2025-09-12 | 20 | 2.1 | **RITARDO PROGETTUALE (1 SETT):** La prima versione del meccanismo non è affidabile. Richiede una ri-progettazione. Nuova fine: 2025-09-19 |
| 2.3 | Progettazione Elettronica | 2025-08-18 | 2025-09-05 | 15 | - | - |
| 2.4 | Design Industriale | 2025-08-18 | 2025-09-05 | 15 | - | - |
| **3** | **Prototipazione** | 2025-09-22 | 2025-10-31 | 30 | 2.2, 2.3, 2.4 | - |
| 3.1 | Approvvigionamento Componenti | 2025-09-22 | 2025-10-03 | 10 | 2.2, 2.3, 2.4 | - |
| 3.2 | Assemblaggio Prototipi | 2025-10-06 | 2025-10-17 | 10 | 3.1 | - |
| 3.3 | Test e Durabilità | 2025-10-20 | 2025-10-31 | 10 | 3.2 | - |
| **4** | **Produzione** | 2026-01-15 | 2026-03-15 | 40 | 5.4 | - |
| 4.1 | Selezione Produttore | 2025-09-01 | 2025-09-26 | 20 | - | Parallelizzabile |
| 4.2 | Setup Linea Produzione | 2026-01-15 | 2026-02-12 | 20 | 4.1, 5.4 | - |
| 4.3 | Produzione Lotto 1 | 2026-02-13 | 2026-03-14 | 20 | 4.2 | - |
| **5** | **Campagna Kickstarter** | 2025-10-01 | 2025-12-31 | 65 | 3.3 | - |
| 5.1 | Sviluppo Strategia | 2025-10-01 | 2025-10-10 | 8 | - | - |
| 5.2 | Creazione Contenuti | 2025-10-13 | 2025-11-07 | 20 | 3.3 (foto prototipo) | - |
| 5.3 | Sviluppo Pagina KS | 2025-11-10 | 2025-11-14 | 5 | 5.2 | - |
| 5.4 | Lancio e Gestione Campagna | 2025-11-17 | 2025-12-31 | 30 | 5.3 | Data di lancio posticipata a causa dei ritardi in R&S. Inizio originale: 2025-11-15 |

## 3. Milestone Principali

*   **Campioni Polimero Ricevuti:** ~~2025-08-08~~ **2025-08-15**
*   **Design Meccanico Approvato:** ~~2025-09-12~~ **2025-09-19**
*   **Prototipo Funzionante Completato:** 2025-10-31
*   **Lancio Campagna Kickstarter:** ~~2025-11-15~~ **2025-11-17**
*   **Fine Campagna Kickstarter:** 2025-12-31
*   **Avvio Produzione Lotto 1:** 2026-02-13
*   **Consegna Prevista ai Backers:** Aprile 2026
