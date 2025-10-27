# Grafico MoSCoW delle Epic di Progetto - MyCart

Questo file contiene il codice per generare un diagramma MoSCoW che illustra la priorità delle Epic del progetto.

## Come visualizzare il grafico

Copia e incolla il codice qui sotto in un editor che supporta Mermaid, come:
- **Editor Online Ufficiale Mermaid:** [https://mermaid.live](https://mermaid.live)
- **Visual Studio Code** con l'estensione "Markdown Preview Mermaid Support".
- **GitLab, GitHub** e molte altre piattaforme che renderizzano automaticamente i diagrammi Mermaid all'interno dei file Markdown.

---

```mermaid
quadrantChart
    title Prioritizzazione Epic (MoSCoW) - MyCart (Rianalisi)
    x-axis "Meno Critico" --> "Più Critico"
    y-axis "Meno Urgente" --> "Più Urgente"
    
    quadrant-1 "Must Have"
    quadrant-2 "Should Have"
    quadrant-3 "Could Have"
    quadrant-4 "Won't Have (per ora)"

    "Ricerca e Comparazione": [0.9, 0.9]
    "Gestione Utenti": [0.8, 0.8]
    "Geolocalizzazione": [0.8, 0.7]
    "Legal": [0.9, 0.6]
    "Profilo Utente": [0.6, 0.6]
    "Notifiche": [0.4, 0.4]
    "Social (Recensioni)": [0.2, 0.1]
    "Gamification": [0.1, 0.2]
```
