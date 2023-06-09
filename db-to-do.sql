PGDMP         "                {            to-do-esoft    14.4    14.4 9    4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    17173    to-do-esoft    DATABASE     j   CREATE DATABASE "to-do-esoft" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "to-do-esoft";
                postgres    false            �            1255    17390    update_timestamp()    FUNCTION     �   CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$;
 )   DROP FUNCTION public.update_timestamp();
       public          postgres    false            �            1259    17316    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    patronymic character varying(255),
    login character varying(50) NOT NULL,
    password text NOT NULL,
    lead_id bigint,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17315    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public          postgres    false    214            8           0    0    employees_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.employees_id_seq OWNED BY public.users.id;
          public          postgres    false    213            �            1259    17175    knex_migrations    TABLE     �   CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
 #   DROP TABLE public.knex_migrations;
       public         heap    postgres    false            �            1259    17174    knex_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.knex_migrations_id_seq;
       public          postgres    false    210            9           0    0    knex_migrations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
          public          postgres    false    209            �            1259    17182    knex_migrations_lock    TABLE     `   CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);
 (   DROP TABLE public.knex_migrations_lock;
       public         heap    postgres    false            �            1259    17181    knex_migrations_lock_index_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.knex_migrations_lock_index_seq;
       public          postgres    false    212            :           0    0    knex_migrations_lock_index_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;
          public          postgres    false    211            �            1259    17334 
   priorities    TABLE       CREATE TABLE public.priorities (
    id integer NOT NULL,
    priority_name character varying(40) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.priorities;
       public         heap    postgres    false            �            1259    17333    prorities_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prorities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.prorities_id_seq;
       public          postgres    false    216            ;           0    0    prorities_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.prorities_id_seq OWNED BY public.priorities.id;
          public          postgres    false    215            �            1259    17343    statuses    TABLE       CREATE TABLE public.statuses (
    id integer NOT NULL,
    status_name character varying(40) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.statuses;
       public         heap    postgres    false            �            1259    17342    statuses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.statuses_id_seq;
       public          postgres    false    218            <           0    0    statuses_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;
          public          postgres    false    217            �            1259    17352    tasks    TABLE     �  CREATE TABLE public.tasks (
    id integer NOT NULL,
    header text NOT NULL,
    description text NOT NULL,
    date_end timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    creator_id bigint NOT NULL,
    responsible_id bigint NOT NULL,
    priority_id bigint NOT NULL,
    status_id bigint NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    17351    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    220            =           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    219            v           2604    17178    knex_migrations id    DEFAULT     x   ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
 A   ALTER TABLE public.knex_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            w           2604    17185    knex_migrations_lock index    DEFAULT     �   ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);
 I   ALTER TABLE public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
       public          postgres    false    212    211    212            {           2604    17337    priorities id    DEFAULT     m   ALTER TABLE ONLY public.priorities ALTER COLUMN id SET DEFAULT nextval('public.prorities_id_seq'::regclass);
 <   ALTER TABLE public.priorities ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            ~           2604    17346    statuses id    DEFAULT     j   ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);
 :   ALTER TABLE public.statuses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    17355    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            x           2604    17319    users id    DEFAULT     h   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            '          0    17175    knex_migrations 
   TABLE DATA           J   COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
    public          postgres    false    210   �C       )          0    17182    knex_migrations_lock 
   TABLE DATA           @   COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
    public          postgres    false    212   CD       -          0    17334 
   priorities 
   TABLE DATA           O   COPY public.priorities (id, priority_name, created_at, updated_at) FROM stdin;
    public          postgres    false    216   dD       /          0    17343    statuses 
   TABLE DATA           K   COPY public.statuses (id, status_name, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �D       1          0    17352    tasks 
   TABLE DATA           �   COPY public.tasks (id, header, description, date_end, created_at, updated_at, creator_id, responsible_id, priority_id, status_id) FROM stdin;
    public          postgres    false    220   �E       +          0    17316    users 
   TABLE DATA           u   COPY public.users (id, firstname, surname, patronymic, login, password, lead_id, created_at, updated_at) FROM stdin;
    public          postgres    false    214   J       >           0    0    employees_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.employees_id_seq', 22, true);
          public          postgres    false    213            ?           0    0    knex_migrations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.knex_migrations_id_seq', 6, true);
          public          postgres    false    209            @           0    0    knex_migrations_lock_index_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);
          public          postgres    false    211            A           0    0    prorities_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.prorities_id_seq', 4, true);
          public          postgres    false    215            B           0    0    statuses_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.statuses_id_seq', 6, true);
          public          postgres    false    217            C           0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 46, true);
          public          postgres    false    219            �           2606    17327    users employees_login_unique 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT employees_login_unique UNIQUE (login);
 F   ALTER TABLE ONLY public.users DROP CONSTRAINT employees_login_unique;
       public            postgres    false    214            �           2606    17187 .   knex_migrations_lock knex_migrations_lock_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);
 X   ALTER TABLE ONLY public.knex_migrations_lock DROP CONSTRAINT knex_migrations_lock_pkey;
       public            postgres    false    212            �           2606    17180 $   knex_migrations knex_migrations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.knex_migrations DROP CONSTRAINT knex_migrations_pkey;
       public            postgres    false    210            �           2606    17341    priorities prorities_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.priorities
    ADD CONSTRAINT prorities_pkey PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.priorities DROP CONSTRAINT prorities_pkey;
       public            postgres    false    216            �           2606    17350    statuses statuses_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.statuses DROP CONSTRAINT statuses_pkey;
       public            postgres    false    218            �           2606    17361    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    220            �           2606    17325    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2620    17393    priorities update_timestamp    TRIGGER     |   CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.priorities FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
 4   DROP TRIGGER update_timestamp ON public.priorities;
       public          postgres    false    216    221            �           2620    17394    statuses update_timestamp    TRIGGER     z   CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.statuses FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
 2   DROP TRIGGER update_timestamp ON public.statuses;
       public          postgres    false    218    221            �           2620    17391    tasks update_timestamp    TRIGGER     w   CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
 /   DROP TRIGGER update_timestamp ON public.tasks;
       public          postgres    false    221    220            �           2620    17392    users update_timestamp    TRIGGER     w   CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
 /   DROP TRIGGER update_timestamp ON public.users;
       public          postgres    false    221    214            �           2606    17362    tasks fk_fkey_creator    FK CONSTRAINT     w   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_fkey_creator FOREIGN KEY (creator_id) REFERENCES public.users(id);
 ?   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_fkey_creator;
       public          postgres    false    220    3211    214            �           2606    17372    tasks fk_fkey_priority    FK CONSTRAINT     ~   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_fkey_priority FOREIGN KEY (priority_id) REFERENCES public.priorities(id);
 @   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_fkey_priority;
       public          postgres    false    216    3213    220            �           2606    17367    tasks fk_fkey_responsible    FK CONSTRAINT        ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_fkey_responsible FOREIGN KEY (responsible_id) REFERENCES public.users(id);
 C   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_fkey_responsible;
       public          postgres    false    220    3211    214            �           2606    17377    tasks fk_fkey_status    FK CONSTRAINT     x   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_fkey_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);
 >   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_fkey_status;
       public          postgres    false    220    218    3215            �           2606    17328    users fk_fkey_users    FK CONSTRAINT     r   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_fkey_users FOREIGN KEY (lead_id) REFERENCES public.users(id);
 =   ALTER TABLE ONLY public.users DROP CONSTRAINT fk_fkey_users;
       public          postgres    false    214    3211    214            '   �   x�]�K
�0�9��b�_���B�A���o_#��f6�|0Xc'{��HY�£h���!8괕����"�V:���m�>��q�b\C[g@�5�1'#���a�%MK�[Q�[!t�9m�Ş�E B�yIð;Ϲ9�>��c����X-tW��z��A�      )      x�3�4������ V      -   t   x�}�1�0F�9>;j�؎is3;w�j�T���Ft����饀{��+>X0��E;�N� \��4D1s�#��J��xamc����}�WҀǆL��Tb���Mj_�����AI      /   �   x�}�K
�0��u��KC���,^�n.]x
��+��H��H��Y���:=4z��>��W�������6pK�`�%��y!I	W��W ��i�N6����G"s-+�:�yZ�H�S9�*XV�G�6S?��|�B��tYa��!Min      1   y  x��WMo�F=S��>7Z���'�C�K���}��CT ��N��@���M�z血Ĩ�����?�[R�$J���FR�v���;of��"�Q�^������<}Hg�Q:I��Y:�5K�W�u�\�hi���ٕ�*0��g���d���)o�e+q���s��,b/�[����q]�}eY��#�b�*K�j�]�"�����2=I�'ez������?�H�ˣ�Ǉ��E~���Ǎ�Yz�7�j�J-�PE�D���@�����z���FYm�l�.@�d8*һt^�X.=�s�U�m%^��.l4����Wp���H�Շ�<�ǎ0tv1��<����Y��MpKV*�3�MT`�q�q�F,�`2�'�!^�����Y�+cT:8+q�fA�eYc��c׸�Y�&�y"2�����4��)�4%�чE?Hd�fOr�������7�\�!_��ۜ�����/��~X���i��L׏r��tZ6�8iB�zooNDY��6�+
ʐ�.���48�Bo�bT���J����Dߌkܚ*�Pz��h�+K��2Ai�i�XlrNzѻ]qo����FI�(��Z*��LK��%�hv�`\������dT|z��r�����Bt�Э}k��"D�ko�bBi�f]��<���˞x�l {�XD粠1�w"��b�r�ư���r����q',;벭����HQvۗwso��04�|,��[1�]Q��QI���,���T Ka����(N;5����2[��O��N( ��r���E�U�bn�4��\c�]\��u��"�P1�����矻�hx0M���� Ϣ���|��1���q�<ڮ�F'�T����~�R�t�Lf�r��m����cW��:��ʹG�7����έ�o�����<��B�N�&�JLd�Uq:�Ӽ�K�mEml���"�F����	֌�6��g��5���}��gר��88MaٵA����Lo��� ��E��o�f�x/���� �80&�(���l]�oԕ�s�]��o�Z��Do1~��]`�0��_f���"7���ffY�]0]���!{�F#��?�?�c�;����[�P9Yw\1-uMh��,��G������DgX,+4-�#��/T���g�	      +   g  x���M��F���{�[���6~Ylcc���r��`��/����K�Vꥇ~��M�4i��7�tS�֬[E����O�f�j�O������]�g���|[�U�;�>�!�7������?H���{w[YԮ�s��6���6����?:l�i�����Z�V���(/z*/xB���3�,'��zľ ��]! C$C���E���� [�+���\Fۻ99;{~b+���b�[$��A�t����L�詊KUYb-e�Nz@7���_(s���a	�g�K���ʾ�=!M:R���[DK�ݤ���Ú�' ��˴}bx{7`wx�u	2�h��
�y� �eH2ϓ3��.�̺��:!/J��(�bд�j�\	��ߏ�I���&tM�e�����X�8	J�畂��:����y�x��aKI�t�W:8d�h���0�����tM>��Ǜ�3Qn��"��4�$��ԧ��b���e������2�p�LSz�N�ة玹 A�M�";�wyOφzh���}˝h�1ʻ�
A��I�X�:�畂�W�w�Gx/WN�y�]�ÞZ��H��=h��2@t�u��6V&�B�4ǫΛ� �1�Y(H�{�T
����qn�+�Ɋz��$��N;xL}j6=�2n�8Sɚh���Ζ��]�"�p2h�K8��J!X+.?����*����u\~$�WD~��������7��ڍ����p�lܒ<4ݬ�!��lA'X�G"�zJZ� z��
H2&(��p�l]\�B��kB��T|"���|�?~Wu{�����BC���.�8vy��H�d�e?�${ͰF[�D+�k4۴vq�ج��s<Ǔ�Ҙ��{��T�%MQ��,I|�     