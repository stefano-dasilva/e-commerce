# Descrizione del Progetto
Questo progetto è il sample di un ecommerce. MERN (Mongo, Express, React, Node), con utilizzo di routing per gli endpoint sul server. Inoltre ho utilizzato Typescript e SASS per lo styling
# Funzionalità Principali
## Registrazione e Login
Gli utenti possono registrarsi e accedere al sistema attraverso una pagina pubblica con form di registrazione e login. La registrazione verifica la validità sintattica dell'indirizzo email e l'uguaglianza tra i campi "password" e "ripeti password". Per l'autenticazione ho utilizzato JWT unito al session storage e cookies.<br>

![Home](/client/src/assets/login.JPG)
![Home](/client/src/assets/register.JPG)

## Accesso all'homePage
In seguito all'accesso l'utente si ritroverà nella home page. Nella parte superiore è presente uno slider per selezionare la categoria del prodotto.  La seconda sezione comprende i prodotti più acquistati dai consumatori<br>

![Home](/client/src/assets/home.JPG)
## Sidebar
Dettagli della sidebar laterale<br>

 ![Details](/client/src/assets/sidebar.JPG)

 ## Prodotti categoria

 Selezionando una categoria si visualizzerrano i prodotti appartenti ad essa. E' possibile ordinarli in base al prezzo<br>


  ![Details](/client/src/assets/products.JPG)
 ## Dettaglio prodotto

 Schiacciando un prodotto all'interno della categoria si apre una pagina che consente di visualizzare i dettagli del prodotto, con la possibilità di aggiungere al carello o comprarlo.
<br>

 ![Comments](/client/src/assets/productdetail.JPG)
 ## Dettagli Acquisto
Se si procede all'acquisto del prodotto l'utente verrà reinderizzato a una pagina contente il riassunto dell'acquisto, con possiblità di cambiare indirizzo di fatturazione e spezione<br>

 ![Thumbnail](/client/src/assets/ordersummary.JPG)

  ## Storico Acquisti
E' possibile tramite la sidebar andare a vedere lo storico degli acquisti fatti. Per ognuno si può vedere lo stato della spedizione e possono essere ordinati per data di acquisto.


 ![Thumbnail](/client/src/assets/purchases.JPG)
  ## Carrello
Interagendo con l'icona del carrello si apre la pagina in cui è possibile visualizzarlo e gestirlo, rimuovendo prodotti da esso e comprandone.


 ![Thumbnail](/client/src/assets/cart.JPG)

## Logout
L'applicazione consente il logout dell'utente.<br>


  ## UML
Vista ad alto livello del model 


 ![uml](/client/src/assets/umlblank.jpeg)

### Strumenti e linguaggi utilizzati 

- `Client` : React, Javascript, Html , SASS, CSS, Typescript
- `Server` : Mongoose, Mongodb (DATABASE), Express