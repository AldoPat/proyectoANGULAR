import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';

//import artist
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';
import { CodigoDetailComponent } from './components/codigo-detail.component';
import { CodigoAddComponent } from './components/codigo-add.component';
import { CodigoEditComponent } from './components/codigo-edit.componet';
import { SongListComponent } from './components/song-list.component';
import { AlbumListComponent } from './components/album-list.component';
import { UserListComponent } from './components/user-list.component';
import { UserListEditComponent } from './components/user-list-edit.component';
import { SongQrComponent } from './components/song-qr.component';
// import { SongQrComponent } from './components/song.component';



const appRoutes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'artistas/:page', component: ArtistListComponent },
    { path: 'crear-artista', component: ArtistAddComponent },
    { path: 'editar-artista/:id', component: ArtistEditComponent },
    { path: 'artista/:id', component: ArtistDetailComponent },
    { path: 'crear-album/:artist', component: AlbumAddComponent },
    { path: 'editar-album/:id', component: AlbumEditComponent },
    { path: 'album/:id', component: AlbumDetailComponent },
    { path: 'crear-tema/:album', component: SongAddComponent },
    { path: 'editar-tema/:id', component: SongEditComponent },
    { path: 'song/:id', component: CodigoDetailComponent },
    { path: 'song-qr/:id', component: SongQrComponent },
    { path: 'song-list/:id', component: SongListComponent },
    { path: 'album-list/:id', component: AlbumListComponent },

    { path: 'crear-codigo/:song', component: CodigoAddComponent },
    { path: 'editar-codigo/:id', component: CodigoEditComponent },
    { path: 'mis-datos', component: UserEditComponent },
    { path: 'user-list/:page', component: UserListComponent },
    { path: 'editar-user/:id', component: UserListEditComponent },
    { path: '**', component: HomeComponent },
    // { path: 'song-user/:id', component: SongUserComponent },

]

export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(appRoutes);

// export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
