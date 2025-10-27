# Pianificazione Sprint - MyCart

Questo documento definisce gli obiettivi e il backlog per i primi due Sprint del progetto MyCart. Ogni Sprint ha una durata di 2 settimane.

---

## Sprint 1: MVP - Ricerca e Comparazione Fondamentali

**Obiettivo dello Sprint:** Consegnare un primissimo MVP (Minimum Viable Product) che consenta agli utenti di cercare un prodotto e confrontare i prezzi tra supermercati vicini, utilizzando dati di test (mock data) per accelerare lo sviluppo iniziale.

### Sprint Backlog

| ID      | User Story                                                                                              | Sviluppo (Rawia) | Grafica (Zufan) | Legal (Maria) |
|---------|---------------------------------------------------------------------------------------------------------|------------------|-----------------|---------------|
| **MYC-01**  | Come utente, voglio potermi registrare con email e password.                                            | **Da fare**      | **Da fare**     | **Da fare**   |
| **MYC-02**  | Come utente registrato, voglio poter effettuare il login.                                               | **Da fare**      | **Da fare**     | -             |
| **MYC-06**  | Come utente, voglio poter leggere e accettare l'informativa sulla privacy e i termini di servizio.      | **Da fare**      | -               | **Da fare**   |
| **MYC-03**  | Come utente, voglio poter cercare un prodotto per nome.                                                 | **Da fare**      | **Da fare**     | -             |
| **MYC-05**  | Come utente, voglio vedere una lista di prezzi dello stesso prodotto nei diversi supermercati (con dati mock). | **Da fare**      | **Da fare**     | -             |
| **Task-01** | Setup dell'ambiente di sviluppo e del database.                                                         | **Da fare**      | -               | -             |

**Note:** In questo Sprint, la geolocalizzazione sarà simulata. Zufan si concentrerà sul design delle interfacce di registrazione, login e risultati di ricerca. Maria dovrà fornire il testo per la privacy policy.

---

## Sprint 2: Integrazione Geolocalizzazione e Liste della Spesa

**Obiettivo dello Sprint:** Sostituire i dati mock con un servizio di geolocalizzazione reale per trovare i supermercati e introdurre la funzionalità delle liste della spesa.

### Sprint Backlog (preliminare)

| ID      | User Story                                                                                              | Sviluppo (Rawia) | Grafica (Zufan) | Legal (Maria) |
|---------|---------------------------------------------------------------------------------------------------------|------------------|-----------------|---------------|
| **MYC-04**  | Come utente, voglio che l'app identifichi la mia posizione per mostrarmi i supermercati nelle vicinanze. | **Da fare**      | **Da fare**     | -             |
| **MYC-09**  | Come utente, voglio poter visualizzare l'indirizzo e la posizione di un supermercato su una mappa.      | **Da fare**      | **Da fare**     | -             |
| **MYC-08**  | Come utente, voglio poter creare e gestire delle liste della spesa.                                     | **Da fare**      | **Da fare**     | -             |
| **Task-02** | Refactoring del backend per integrare le API di geolocalizzazione.                                      | **Da fare**      | -               | -             |
| **Task-03** | Feedback e miglioramento UI basato sui risultati dello Sprint 1.                                        | **Da fare**      | **Da fare**     | -             |

**Note:** La priorità di questo backlog potrebbe cambiare in base al feedback ricevuto da Valentina e dai primi test dell'MVP dello Sprint 1.
